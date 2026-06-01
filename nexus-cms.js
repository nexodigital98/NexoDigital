/**
 * NEXUS CMS - Motor Dinámico para Plantillas NexoDigital
 * Soporta: live preview via postMessage + carga desde content.json
 */

// ── LIVE PREVIEW desde el panel Admin ────────────────────────────────────
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'nexus-preview') {
        applyData(event.data.content);
    }
});

// ── CARGA INICIAL desde content.json ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) return;
        const data = await response.json();
        applyData(data);
    } catch (e) { /* usa valores estáticos del HTML */ }
});

// ── APLICAR DATOS AL DOM ──────────────────────────────────────────────────
function applyData(data) {
    if (!data) return;
    if (data.tema)     applyTema(data.tema);
    if (data.textos)   applyTextos(data.textos);
    if (data.imagenes) applyImagenes(data.imagenes);
    if (data.redes)    applyRedes(data.redes);
    if (data.secciones && Array.isArray(data.secciones)) applySections(data.secciones);
}

// ── 1. COLORES ────────────────────────────────────────────────────────────
function applyTema(tema) {
    const hex = tema.color_primario || '#00E5FF';
    const rgb = hexToRgb(hex);

    // Eliminar estilos previos
    document.getElementById('nexus-color-override')?.remove();

    const s = document.createElement('style');
    s.id = 'nexus-color-override';
    s.innerHTML = `
        :root {
            --sl-gold:      ${hex} !important;
            --sl-gold-dim:  ${darken(hex, 20)} !important;
            --sl-gold-glow: rgba(${rgb}, 0.4) !important;
            --sl-cyan:      ${hex} !important;
            --sl-purple:    ${hex} !important;
            --sl-purple2:   ${darken(hex, 20)} !important;
            --sl-violet:    ${hex} !important;
            --sl-violet-glow: rgba(${rgb}, 0.35) !important;
            --card-gold2:   ${hex} !important;
        }
        /* Botones y bordes */
        .btn-floating-card { border-color: ${hex} !important; color: ${hex} !important; }
        .btn-floating-card:hover { background: ${hex} !important; color: #000 !important; }
        .sl-nav-cta { color: ${hex} !important; border-color: ${hex} !important; }
        .sl-nav-cta:hover { background: ${hex} !important; color: #000 !important; }
        /* Esquinas de la tarjeta */
        .card-corner::before, .card-corner::after { background: linear-gradient(135deg, ${hex}, ${darken(hex,20)}) !important; }
        /* Banner y divisor del nombre */
        .fut-name-banner { border-top-color: rgba(${rgb},0.8) !important; border-bottom-color: rgba(${rgb},0.8) !important; }
        .fut-divider { background: linear-gradient(90deg, transparent, rgba(${rgb},0.9), transparent) !important; }
        /* Social buttons */
        .social-btn { border-color: rgba(${rgb},0.35) !important; }
        .social-btn:hover { background: rgba(${rgb},0.25) !important; border-color: rgba(${rgb},0.7) !important; box-shadow: 0 5px 15px rgba(${rgb},0.3) !important; }
        /* Botón circle rating */
        .bottom-rating-circle { background: linear-gradient(135deg, rgba(${rgb},0.25) 0%, rgba(13,71,161,0.4) 100%) !important; border-color: rgba(${rgb},0.5) !important; }
        /* Shimmer y glow */
        .shimmer-layer { background: linear-gradient(90deg, transparent 0%, rgba(${rgb},0.15) 50%, transparent 100%) !important; }
        /* Nav links */
        .sl-nav-links a:hover { color: ${hex} !important; }
        /* FAQs, íconos de sección */
        [style*="var(--sl-gold)"] { color: ${hex} !important; }
        [style*="sl-gold"] { color: ${hex} !important; }
        /* Texto glowing */
        .sl-glow-text { color: ${hex} !important; text-shadow: 0 0 20px rgba(${rgb}, 0.6) !important; }
        /* Panel de ubicación */
        [style*="border-left: 4px solid var(--sl-gold)"] { border-left-color: ${hex} !important; }
    `;
    document.head.appendChild(s);

    // Fondo de pantalla de la tarjeta (color sólido o imagen)
    if (tema.card_bg_color) {
        const cardScreen = document.getElementById('card-screen');
        if (cardScreen) cardScreen.style.background = tema.card_bg_color;
    }
    if (tema.card_bg_image) {
        const cardScreen = document.getElementById('card-screen');
        if (cardScreen) {
            cardScreen.style.backgroundImage = `url(${tema.card_bg_image})`;
            cardScreen.style.backgroundSize = 'cover';
            cardScreen.style.backgroundPosition = 'center';
        }
    }
}

// ── 2. TEXTOS ─────────────────────────────────────────────────────────────
function applyTextos(textos) {
    for (const [key, value] of Object.entries(textos)) {
        if (!value) continue;
        // Elementos con data-cms-text
        document.querySelectorAll(`[data-cms-text="${key}"]`).forEach(el => {
            el.textContent = value;
        });
    }

    // Nombre de la empresa en el navbar
    if (textos.empresa_nombre) {
        document.querySelectorAll('.sl-nav-logo-text, .sl-brand-name, [data-cms-text="empresa_nombre"]').forEach(el => {
            el.textContent = textos.empresa_nombre;
        });
    }

    // Iniciales del círculo
    if (textos.card_initials) {
        document.querySelectorAll('.bottom-rating-circle, [data-cms-text="card_initials"]').forEach(el => {
            if (el.children.length === 0) el.textContent = textos.card_initials;
        });
    }

    // Título del hero en la landing
    if (textos.hero_title) {
        document.querySelectorAll('[data-cms-text="hero_title"], .sl-hero-title, .sl-hero h1').forEach(el => {
            el.textContent = textos.hero_title;
        });
    }

    // Descripción hero
    if (textos.hero_desc) {
        document.querySelectorAll('[data-cms-text="hero_desc"], .sl-hero-desc, .sl-hero p').forEach(el => {
            el.textContent = textos.hero_desc;
        });
    }
}

// ── 3. IMÁGENES ───────────────────────────────────────────────────────────
function applyImagenes(imagenes) {
    // Logo
    if (imagenes.logo) {
        document.querySelectorAll('[data-cms-img="logo"], .card-logo').forEach(el => {
            el.src = imagenes.logo;
        });
    }
    // Foto del equipo / hero (en la tarjeta Y en la landing)
    if (imagenes.hero_image) {
        document.querySelectorAll('[data-cms-img="hero_image"], .sl-team-img').forEach(el => {
            el.src = imagenes.hero_image;
        });
    }
    // Fondo de la tarjeta (imagen)
    if (imagenes.card_bg) {
        const cardScreen = document.getElementById('card-screen');
        if (cardScreen) {
            cardScreen.style.backgroundImage = `url(${imagenes.card_bg})`;
            cardScreen.style.backgroundSize = 'cover';
            cardScreen.style.backgroundPosition = 'center';
        }
    }
}

// ── 4. REDES SOCIALES ─────────────────────────────────────────────────────
function applyRedes(redes) {
    const REDES_CFG = [
        { id:'whatsapp', icon:'fa-whatsapp', buildUrl: v => v.startsWith('http') ? v : `https://wa.me/${v.replace(/\D/g,'')}` },
        { id:'facebook',  icon:'fa-facebook-f',  buildUrl: v => v },
        { id:'instagram', icon:'fa-instagram',   buildUrl: v => v },
        { id:'tiktok',    icon:'fa-tiktok',      buildUrl: v => v },
        { id:'linkedin',  icon:'fa-linkedin-in', buildUrl: v => v },
    ];

    const active = REDES_CFG.filter(r => redes[r.id]);

    // Tarjeta digital
    const cardSocials = document.querySelector('.card-socials');
    if (cardSocials) {
        cardSocials.innerHTML = active.map(r =>
            `<a href="${r.buildUrl(redes[r.id])}" target="_blank" class="social-btn" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`
        ).join('');
    }

    // Footer de la web
    const footerSocials = document.querySelector('.sl-footer-socials');
    if (footerSocials) {
        footerSocials.innerHTML = active.map(r =>
            `<a href="${r.buildUrl(redes[r.id])}" target="_blank" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`
        ).join('');
    }

    // Botones de WhatsApp en toda la página
    if (redes.whatsapp) {
        const waUrl = `https://wa.me/${redes.whatsapp.replace(/\D/g,'')}`;
        document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
            el.href = waUrl;
        });
    }
}

// ── 5. ORDEN Y VISIBILIDAD DE SECCIONES ──────────────────────────────────
function applySections(secciones) {
    const landing = document.getElementById('landing-screen');
    if (!landing) return;
    const footer = landing.querySelector('footer, .sl-footer');
    const allSecs = Array.from(landing.querySelectorAll('section[id^="sec-"]'));
    allSecs.forEach(s => { s.style.display = 'none'; });
    secciones.forEach(secId => {
        const sec = allSecs.find(s => s.id === secId);
        if (sec) {
            sec.style.display = '';
            footer ? landing.insertBefore(sec, footer) : landing.appendChild(sec);
        }
    });
}

// ── HELPERS ───────────────────────────────────────────────────────────────
function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '0, 229, 255';
}

function darken(hex, amount) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!r) return hex;
    const d = v => Math.max(0, Math.min(255, parseInt(v,16) - amount));
    return `#${d(r[1]).toString(16).padStart(2,'0')}${d(r[2]).toString(16).padStart(2,'0')}${d(r[3]).toString(16).padStart(2,'0')}`;
}
