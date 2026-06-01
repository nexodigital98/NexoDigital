/**
 * NEXUS CMS - Motor Dinámico para Plantillas NexoDigital
 * Lee data/content.json (Netlify CMS) Y escucha mensajes postMessage
 * del panel de control admin para mostrar la vista previa en VIVO.
 */

// ── LIVE PREVIEW: Escuchar mensajes del panel admin ───────────────────────
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'nexus-preview') {
        applyData(event.data.content);
    }
});

// ── CARGA INICIAL: Leer content.json al abrir la página ──────────────────
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) return; // Sin JSON, usa los valores por defecto del HTML
        const data = await response.json();
        applyData(data);
    } catch (e) {
        // Sin conexión o sin archivo: la página usa los valores estáticos del HTML
    }
});

// ── FUNCIÓN PRINCIPAL: Aplicar datos al DOM ───────────────────────────────
function applyData(data) {
    if (!data) return;

    // 1. COLORES
    if (data.tema && data.tema.color_primario) {
        applyColor(data.tema.color_primario);
    }

    // 2. TEXTOS (data-cms-text="campo")
    if (data.textos) {
        for (const [key, value] of Object.entries(data.textos)) {
            if (!value) continue;
            document.querySelectorAll(`[data-cms-text="${key}"]`).forEach(el => {
                el.textContent = value;
            });
        }

        // Iniciales del círculo inferior de la tarjeta
        if (data.textos.card_initials) {
            const initCircle = document.querySelector('.bottom-rating-circle');
            if (initCircle) initCircle.textContent = data.textos.card_initials;
        }
    }

    // 3. IMÁGENES (data-cms-img="campo")
    if (data.imagenes) {
        for (const [key, value] of Object.entries(data.imagenes)) {
            if (!value) continue;
            document.querySelectorAll(`[data-cms-img="${key}"]`).forEach(el => {
                el.src = value;
            });
        }
    }

    // 4. REDES SOCIALES
    if (data.redes) {
        applyRedes(data.redes);
    }

    // 5. ORDEN Y VISIBILIDAD DE SECCIONES
    if (data.secciones && Array.isArray(data.secciones)) {
        applySections(data.secciones);
    }
}

// ── APLICAR COLORES ───────────────────────────────────────────────────────
function applyColor(hex) {
    const rgb = hexToRgb(hex);

    // Eliminar estilos previos de color para no acumular
    const prevStyle = document.getElementById('nexus-color-override');
    if (prevStyle) prevStyle.remove();

    const style = document.createElement('style');
    style.id = 'nexus-color-override';
    style.innerHTML = `
        :root {
            --sl-gold: ${hex} !important;
            --sl-cyan: ${hex} !important;
            --sl-glow: rgba(${rgb}, 0.4) !important;
        }
        .sl-glow-text { color: ${hex} !important; text-shadow: 0 0 20px rgba(${rgb}, 0.5) !important; }
        .sl-btn-primary, .btn-flip { background: ${hex} !important; }
        .sl-btn-primary span, .btn-flip span { color: #000 !important; }
        .card-corner { border-color: ${hex} !important; }
        .fut-name-banner { background: linear-gradient(135deg, ${hex}33, ${hex}11) !important; border-color: ${hex} !important; }
        .social-btn:hover { background: ${hex} !important; color: #000 !important; }
        .sl-skill-fill { background: ${hex} !important; }
        .sl-system-tag { border-color: ${hex}55 !important; color: ${hex} !important; }
        .sl-nav-cta { background: ${hex} !important; color: #000 !important; }
        .sl-service-icon-audit { background: ${hex}22 !important; color: ${hex} !important; }
    `;
    document.head.appendChild(style);
}

// ── APLICAR REDES SOCIALES ────────────────────────────────────────────────
function applyRedes(redes) {
    const redesConfig = [
        { id: 'whatsapp', icon: 'fa-whatsapp', buildUrl: (v) => v.startsWith('http') ? v : `https://wa.me/${v}` },
        { id: 'facebook', icon: 'fa-facebook-f', buildUrl: (v) => v },
        { id: 'instagram', icon: 'fa-instagram', buildUrl: (v) => v },
        { id: 'tiktok', icon: 'fa-tiktok', buildUrl: (v) => v },
        { id: 'linkedin', icon: 'fa-linkedin-in', buildUrl: (v) => v },
    ];

    // Tarjeta digital
    const cardSocials = document.querySelector('.card-socials');
    if (cardSocials) {
        cardSocials.innerHTML = redesConfig
            .filter(r => redes[r.id])
            .map(r => `<a href="${r.buildUrl(redes[r.id])}" target="_blank" class="social-btn" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`)
            .join('');
    }

    // Footer
    const footerSocials = document.querySelector('.sl-footer-socials');
    if (footerSocials) {
        footerSocials.innerHTML = redesConfig
            .filter(r => redes[r.id])
            .map(r => `<a href="${r.buildUrl(redes[r.id])}" target="_blank" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`)
            .join('');
    }

    // Links de WhatsApp en botones CTA (href con wa.me)
    if (redes.whatsapp) {
        const waUrl = `https://wa.me/${redes.whatsapp}`;
        document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
            const originalHref = el.getAttribute('href');
            if (originalHref) {
                el.href = originalHref.replace(/https:\/\/wa\.me\/\d+/, waUrl);
            }
        });
    }
}

// ── APLICAR ORDEN DE SECCIONES ────────────────────────────────────────────
function applySections(secciones) {
    const landing = document.getElementById('landing-screen');
    if (!landing) return;

    const footer = landing.querySelector('footer.sl-footer');
    const allSecs = Array.from(landing.querySelectorAll('section[id^="sec-"]'));

    // Ocultar todas primero
    allSecs.forEach(s => { s.style.display = 'none'; });

    // Reinsertar en el orden del JSON, solo las activas
    secciones.forEach(secId => {
        const sec = allSecs.find(s => s.id === secId);
        if (sec) {
            sec.style.display = 'block';
            if (footer) {
                landing.insertBefore(sec, footer);
            } else {
                landing.appendChild(sec);
            }
        }
    });
}

// ── HELPER: HEX A RGB ─────────────────────────────────────────────────────
function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '0, 229, 255';
}
