/**
 * NEXUS CMS - Motor Dinámico para Plantillas NexoDigital
 * Soporta: live preview via postMessage + carga desde content.json
 * v4.0 — Color total de tarjeta + contraste automático de texto
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
    const hexWeb  = tema.color_web  || tema.color_primario || '#00E5FF';
    const hexCard = tema.color_card || tema.color_primario || '#00E5FF';
    const rgbWeb  = hexToRgb(hexWeb);
    const rgbCard = hexToRgb(hexCard);
    const textColor = getContrastColor(hexCard); // blanco o negro según el color

    document.getElementById('nexus-color-override')?.remove();

    const s = document.createElement('style');
    s.id = 'nexus-color-override';
    s.innerHTML = `
        /* ── COLOR WEB (navbar, botones, landing) ── */
        :root {
            --sl-gold:        ${hexWeb} !important;
            --sl-gold-dim:    ${darken(hexWeb, 20)} !important;
            --sl-gold-glow:   rgba(${rgbWeb}, 0.4) !important;
            --sl-cyan:        ${hexWeb} !important;
            --sl-purple:      ${hexWeb} !important;
            --sl-purple2:     ${darken(hexWeb, 20)} !important;
            --sl-violet:      ${hexWeb} !important;
            --sl-violet-glow: rgba(${rgbWeb}, 0.35) !important;
        }
        .sl-nav-cta           { color: ${hexWeb} !important; border-color: ${hexWeb} !important; }
        .sl-nav-cta:hover     { background: ${hexWeb} !important; color: #000 !important; }
        .sl-nav-links a:hover { color: ${hexWeb} !important; }
        .sl-glow-text         { color: ${hexWeb} !important; text-shadow: 0 0 20px rgba(${rgbWeb}, 0.6) !important; }
        [style*="var(--sl-gold)"] { color: ${hexWeb} !important; }
        [style*="sl-gold"]        { color: ${hexWeb} !important; }
        [style*="border-left: 4px solid var(--sl-gold)"] { border-left-color: ${hexWeb} !important; }

        /* ══════════════════════════════════════════════════
           COLOR TARJETA — TODO el color es el elegido
           No quedan colores dorados ni azules hardcodeados
        ══════════════════════════════════════════════════ */

        /* Borde exterior y glow de la tarjeta */
        .fut-card-body {
            border-color: ${hexCard} !important;
            box-shadow:
                0 0 18px rgba(${rgbCard}, 0.55),
                0 0 50px rgba(${rgbCard}, 0.22),
                inset 0 0 30px rgba(${rgbCard}, 0.07) !important;
        }

        /* Esquinas decorativas */
        .card-corner::before,
        .card-corner::after {
            background: linear-gradient(135deg, ${hexCard}, ${darken(hexCard, 25)}) !important;
        }

        /* Banner del nombre — fondo translúcido del color elegido */
        .fut-name-banner {
            border-top:    1px solid rgba(${rgbCard}, 0.85) !important;
            border-bottom: 1px solid rgba(${rgbCard}, 0.85) !important;
            background:    rgba(${rgbCard}, 0.10) !important;
        }

        /* Nombre y cargo — contraste automático blanco/negro */
        .fut-name-banner h2,
        .fut-name-banner h3,
        .card-name,
        [data-cms-text="card_nombre"],
        [data-cms-text="card_titulo"] {
            color: ${textColor} !important;
            text-shadow: 0 0 14px rgba(${rgbCard}, 0.75) !important;
        }

        /* Slogan debajo del nombre */
        .card-slogan,
        [data-cms-text="card_slogan"] {
            color: ${textColor} !important;
            opacity: 0.85 !important;
        }

        /* Línea divisora */
        .fut-divider {
            background: linear-gradient(90deg, transparent, ${hexCard}, transparent) !important;
        }

        /* Iconos de redes sociales */
        .social-btn {
            border-color: rgba(${rgbCard}, 0.45) !important;
            color: ${hexCard} !important;
        }
        .social-btn:hover {
            background:   rgba(${rgbCard}, 0.22) !important;
            border-color: ${hexCard} !important;
            color:        ${hexCard} !important;
            box-shadow:   0 5px 18px rgba(${rgbCard}, 0.45) !important;
        }

        /* Botón "Más Información / Flip" */
        .btn-flip {
            border-color: rgba(${rgbCard}, 0.6) !important;
            color:        ${hexCard} !important;
            box-shadow:   0 0 12px rgba(${rgbCard}, 0.2) !important;
        }
        .btn-flip:hover {
            background:  rgba(${rgbCard}, 0.18) !important;
            box-shadow:  0 0 22px rgba(${rgbCard}, 0.55) !important;
        }

        /* Círculo inferior de iniciales */
        .bottom-rating-circle {
            background:   linear-gradient(135deg, rgba(${rgbCard}, 0.30), rgba(${rgbCard}, 0.12)) !important;
            border-color: rgba(${rgbCard}, 0.6) !important;
            color:        ${hexCard} !important;
        }

        /* Efecto shimmer/brillo interno */
        .shimmer-layer {
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(${rgbCard}, 0.18) 50%,
                transparent 100%
            ) !important;
        }

        /* Línea decorativa card-gold2 */
        .card-gold2 { background: ${hexCard} !important; }

        /* Botón flotante "Ver Tarjeta" */
        .btn-floating-card       { border-color: ${hexCard} !important; color: ${hexCard} !important; }
        .btn-floating-card:hover { background:   ${hexCard} !important; color: #000 !important; }
    `;
    document.head.appendChild(s);

    // Fondo de la tarjeta (color sólido)
    if (tema.card_bg_color) {
        const cardScreen = document.getElementById('card-screen');
        if (cardScreen) cardScreen.style.background = tema.card_bg_color;
    }
    // Fondo de la tarjeta (imagen)
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
        if (!value && value !== 0) continue;
        document.querySelectorAll(`[data-cms-text="${key}"]`).forEach(el => {
            el.textContent = value;
        });
        document.querySelectorAll(`[data-cms-href="${key}"]`).forEach(el => {
            el.href = value;
        });
        document.querySelectorAll(`[data-cms-iframe="${key}"]`).forEach(el => {
            el.src = `https://maps.google.com/maps?q=${encodeURIComponent(value)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        });
    }

    if (textos.empresa_nombre) {
        document.querySelectorAll('[data-cms-text="empresa_nombre"]').forEach(el => {
            el.textContent = textos.empresa_nombre;
        });
    }

    if (textos.card_initials) {
        document.querySelectorAll('[data-cms-text="card_initials"], .bottom-rating-circle').forEach(el => {
            if (el.children.length === 0) el.textContent = textos.card_initials;
        });
    }

    if (textos.hero_title) {
        document.querySelectorAll('[data-cms-text="hero_title"]').forEach(el => {
            el.textContent = textos.hero_title;
        });
    }

    if (textos.hero_title_highlight) {
        document.querySelectorAll('[data-cms-text="hero_title_highlight"]').forEach(el => {
            el.textContent = textos.hero_title_highlight;
        });
    }

    if (textos.hero_title_end) {
        document.querySelectorAll('[data-cms-text="hero_title_end"]').forEach(el => {
            el.textContent = textos.hero_title_end;
        });
    }

    if (textos.hero_desc) {
        document.querySelectorAll('[data-cms-text="hero_desc"]').forEach(el => {
            el.textContent = textos.hero_desc;
        });
    }

    if (textos.btn_cta) {
        document.querySelectorAll('[data-cms-text="btn_cta"]').forEach(el => {
            el.textContent = textos.btn_cta;
        });
    }

    if (textos.stat1_num)   document.querySelectorAll('[data-cms-text="stat1_num"]').forEach(el   => el.textContent = textos.stat1_num);
    if (textos.stat1_label) document.querySelectorAll('[data-cms-text="stat1_label"]').forEach(el => el.textContent = textos.stat1_label);
    if (textos.stat2_num)   document.querySelectorAll('[data-cms-text="stat2_num"]').forEach(el   => el.textContent = textos.stat2_num);
    if (textos.stat2_label) document.querySelectorAll('[data-cms-text="stat2_label"]').forEach(el => el.textContent = textos.stat2_label);
}

// ── 3. IMÁGENES ───────────────────────────────────────────────────────────
function applyImagenes(imagenes) {
    if (imagenes.logo) {
        document.querySelectorAll('[data-cms-img="logo"], .card-logo, .sl-logo-img').forEach(el => {
            el.src = imagenes.logo;
        });
    }
    if (imagenes.hero_image) {
        document.querySelectorAll('[data-cms-img="hero_image"], .sl-team-img').forEach(el => {
            el.src = imagenes.hero_image;
        });
    }
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
        { id:'whatsapp',  icon:'fa-whatsapp',    buildUrl: v => v.startsWith('http') ? v : `https://wa.me/${v.replace(/\D/g,'')}` },
        { id:'facebook',  icon:'fa-facebook-f',  buildUrl: v => v },
        { id:'instagram', icon:'fa-instagram',   buildUrl: v => v },
        { id:'tiktok',    icon:'fa-tiktok',      buildUrl: v => v },
        { id:'linkedin',  icon:'fa-linkedin-in', buildUrl: v => v },
    ];

    const active = REDES_CFG.filter(r => redes[r.id]);

    const cardSocials = document.querySelector('.card-socials');
    if (cardSocials) {
        cardSocials.innerHTML = active.map(r =>
            `<a href="${r.buildUrl(redes[r.id])}" target="_blank" class="social-btn" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`
        ).join('');
    }

    const footerSocials = document.querySelector('.sl-footer-socials');
    if (footerSocials) {
        footerSocials.innerHTML = active.map(r =>
            `<a href="${r.buildUrl(redes[r.id])}" target="_blank" aria-label="${r.id}">
                <i class="fab ${r.icon}"></i></a>`
        ).join('');
    }

    if (redes.whatsapp) {
        const waUrl = `https://wa.me/${redes.whatsapp.replace(/\D/g,'')}`;
        document.querySelectorAll('a[href*="wa.me"]').forEach(el => { el.href = waUrl; });
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

/**
 * Devuelve '#ffffff' (blanco) o '#000000' (negro) según el color de fondo
 * para garantizar el mejor contraste posible en los textos de la tarjeta.
 */
function getContrastColor(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!r) return '#ffffff';
    const R = parseInt(r[1], 16);
    const G = parseInt(r[2], 16);
    const B = parseInt(r[3], 16);
    // Fórmula de luminancia perceptual (WCAG)
    const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
    return luminance > 0.55 ? '#000000' : '#ffffff';
}
