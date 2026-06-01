/**
 * NEXUS CMS - Motor Dinámico para Plantillas
 * Este script lee data/content.json (generado por Netlify CMS) 
 * y re-hidrata la página estática con los colores, textos, redes y orden de secciones elegidos.
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) {
            console.log("No se encontró content.json, usando valores por defecto.");
            return;
        }
        const data = await response.json();

        // 1. APLICAR COLORES (Si el usuario eligió un color primario)
        if (data.tema && data.tema.color_primario) {
            const hex = data.tema.color_primario;
            const style = document.createElement('style');
            style.innerHTML = `
                :root {
                    --sl-gold: ${hex} !important;
                    --sl-cyan: ${hex} !important;
                    --sl-glow: rgba(${hexToRgb(hex)}, 0.4) !important;
                }
                .sl-glow-text {
                    text-shadow: 0 0 20px rgba(${hexToRgb(hex)}, 0.6) !important;
                }
            `;
            document.head.appendChild(style);
        }

        // 2. APLICAR TEXTOS E IMAGENES (data-cms="campo")
        if (data.textos) {
            for (const [key, value] of Object.entries(data.textos)) {
                const el = document.querySelector(`[data-cms-text="${key}"]`);
                if (el && value) el.innerHTML = value;
            }
        }
        if (data.imagenes) {
            for (const [key, value] of Object.entries(data.imagenes)) {
                const el = document.querySelector(`[data-cms-img="${key}"]`);
                if (el && value) el.src = value;
            }
        }

        // 3. APLICAR REDES SOCIALES
        if (data.redes) {
            const redesConfig = [
                { id: 'whatsapp', url: data.redes.whatsapp, icon: 'fa-whatsapp' },
                { id: 'facebook', url: data.redes.facebook, icon: 'fa-facebook-f' },
                { id: 'instagram', url: data.redes.instagram, icon: 'fa-instagram' },
                { id: 'tiktok', url: data.redes.tiktok, icon: 'fa-tiktok' },
                { id: 'linkedin', url: data.redes.linkedin, icon: 'fa-linkedin-in' }
            ];

            // Para la tarjeta digital (front)
            const cardSocials = document.querySelector('.card-socials');
            if (cardSocials) {
                cardSocials.innerHTML = ''; // Limpiamos las default
                redesConfig.forEach(red => {
                    if (red.url) {
                        const href = red.id === 'whatsapp' && !red.url.startsWith('http') 
                                        ? `https://wa.me/${red.url}` 
                                        : red.url;
                        cardSocials.innerHTML += `<a href="${href}" target="_blank" class="social-btn" aria-label="${red.id}"><i class="fab ${red.icon}"></i></a>`;
                    }
                });
            }

            // Para el footer
            const footerSocials = document.querySelector('.sl-footer-socials');
            if (footerSocials) {
                footerSocials.innerHTML = '';
                redesConfig.forEach(red => {
                    if (red.url) {
                        const href = red.id === 'whatsapp' && !red.url.startsWith('http') 
                                        ? `https://wa.me/${red.url}` 
                                        : red.url;
                        footerSocials.innerHTML += `<a href="${href}" target="_blank"><i class="fab ${red.icon}"></i></a>`;
                    }
                });
            }
        }

        // 4. REORDENAMIENTO Y VISIBILIDAD DE SECCIONES
        if (data.secciones && Array.isArray(data.secciones)) {
            const mainLanding = document.getElementById('landing-screen');
            if (mainLanding) {
                // Seleccionamos todas las secciones que son reordenables (las que tienen id que empieza con 'sec-')
                const allSections = Array.from(mainLanding.querySelectorAll('section[id^="sec-"]'));
                
                // Las removemos del DOM temporalmente
                allSections.forEach(sec => sec.remove());

                // Ahora las reinsertamos en el orden que dice el JSON.
                // Insertamos antes del footer.
                const footer = document.querySelector('footer.sl-footer');
                
                data.secciones.forEach(secId => {
                    const sectionHTML = allSections.find(s => s.id === secId);
                    if (sectionHTML) {
                        // Si está en el JSON, la insertamos y la hacemos visible
                        sectionHTML.style.display = 'block';
                        if (footer) {
                            mainLanding.insertBefore(sectionHTML, footer);
                        } else {
                            mainLanding.appendChild(sectionHTML);
                        }
                    }
                });
            }
        }

    } catch (e) {
        console.log("Nexus CMS Error:", e);
    }
});

// Función auxiliar para convertir HEX a RGB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
        : "226, 199, 117";
}
