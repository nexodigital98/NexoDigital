
/* ═══════════════════════════════════════════════════════
   NEXO ADMIN — Custom CMS Panel with Live Preview
   ═══════════════════════════════════════════════════════ */

const SOCIALS = [
    { id:'whatsapp', label:'WhatsApp', icon:'fa-whatsapp', color:'#25D366', ph:'593999999999', hint:'Solo números con código de país' },
    { id:'facebook', label:'Facebook', icon:'fa-facebook-f', color:'#1877F2', ph:'https://facebook.com/mi-negocio' },
    { id:'instagram', label:'Instagram', icon:'fa-instagram', color:'#E4405F', ph:'https://instagram.com/mi-negocio' },
    { id:'tiktok', label:'TikTok', icon:'fa-tiktok', color:'#69C9D0', ph:'https://tiktok.com/@mi-negocio' },
    { id:'linkedin', label:'LinkedIn', icon:'fa-linkedin-in', color:'#0A66C2', ph:'https://linkedin.com/in/mi-perfil' },
];

const SECTIONS_DEF = [
    { id:'sec-servicios', label:'Servicios / Especialidades', icon:'fa-briefcase' },
    { id:'sec-perfil', label:'Perfil / Quiénes Somos', icon:'fa-user-tie' },
    { id:'sec-precios', label:'Precios y Paquetes', icon:'fa-tags' },
    { id:'sec-faq', label:'Preguntas Frecuentes', icon:'fa-question-circle' },
    { id:'sec-ubicacion', label:'Ubicación / Mapa', icon:'fa-map-marker-alt' },
    { id:'sec-cta', label:'Llamada a la Acción', icon:'fa-bullhorn' },
];

let currentUser = null, contentSha = null, tplPath = '', hasChanges = false, debounce = null;
let formData = {
    tema:{ color_primario:'#00E5FF', card_bg_color:'' },
    textos:{ card_name:'', card_slogan:'', card_initials:'', hero_title:'', hero_desc:'', empresa_nombre:'' },
    imagenes:{ logo:'', hero_image:'', card_bg:'' },
    redes:{},
    secciones: SECTIONS_DEF.filter(s => s.id !== 'sec-precios').map(s => s.id)
};

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    tplPath = window.location.pathname.split('/').filter(Boolean)[0] || 'Abogado';
    document.getElementById('tpl-label').textContent = tplPath;

    buildSocials();
    buildSections();
    setupColorPicker();
    setupTabs();
    setupPreviewControls();
    setupImages();
    setupFormListeners();
    setupDnD();

    // Iframe reload → resend preview
    document.getElementById('preview-iframe').addEventListener('load', () => {
        setTimeout(sendPreview, 900);
    });

    // Netlify Identity
    if (window.netlifyIdentity) {
        netlifyIdentity.on('init', u => {
            u ? onLogin(u) : hide('loading');
        });
        netlifyIdentity.on('login', u => { onLogin(u); netlifyIdentity.close(); });
        netlifyIdentity.on('logout', () => {
            currentUser = null;
            show('login-screen'); hide('editor-screen');
        });
        netlifyIdentity.init();
    } else { hide('loading'); }

    document.getElementById('btn-login').onclick = () => netlifyIdentity.open('login');
    document.getElementById('btn-logout').onclick = () => netlifyIdentity.logout();
    document.getElementById('btn-publish').onclick = publishChanges;
});

// ── AUTH ──────────────────────────────────────────────
async function onLogin(user) {
    currentUser = user;
    hide('login-screen');
    document.getElementById('editor-screen').classList.add('visible');
    show('loading');
    document.querySelector('.loading-lbl').textContent = 'Cargando tu configuración...';
    await loadContent();
    hide('loading');
}

// ── LOAD FROM GITHUB ──────────────────────────────────
async function loadContent() {
    try {
        await currentUser.jwt(true);
        const token = currentUser.token.access_token;
        const path = `${tplPath}/data/content.json`;
        const res = await fetch(`/.netlify/git/github/contents/${path}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            const fd = await res.json();
            contentSha = fd.sha;
            const decoded = JSON.parse(atob(fd.content.replace(/\n/g,'')));
            formData = deepMerge(formData, decoded);
            toast('Configuración cargada', 'success');
        } else if (res.status === 404) {
            toast('Archivo nuevo — configura y publica cuando estés listo', 'info');
        }
    } catch(e) { toast('Usando valores por defecto', 'info'); }
    populateForm();
}

function deepMerge(base, override) {
    const result = { ...base };
    for (const key of Object.keys(override)) {
        if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
            result[key] = deepMerge(base[key] || {}, override[key]);
        } else {
            result[key] = override[key];
        }
    }
    return result;
}

// ── POPULATE FORM ──────────────────────────────────────
function populateForm() {
    const t = formData.textos || {};
    const r = formData.redes || {};
    const tema = formData.tema || {};

    setVal('f-name', t.card_name);
    setVal('f-slogan', t.card_slogan);
    setVal('f-initials', t.card_initials);
    setVal('f-hero-title', t.hero_title);
    setVal('f-hero-desc', t.hero_desc);
    setVal('f-empresa', t.empresa_nombre);
    setVal('f-wa-main', r.whatsapp);

    const color = tema.color_primario || '#00E5FF';
    document.getElementById('color-native').value = color;
    document.getElementById('color-hex').value = color;
    document.getElementById('color-box').style.background = color;
    syncColorSwatches(color);

    if (tema.card_bg_color) {
        document.getElementById('bg-color-native').value = tema.card_bg_color;
        document.getElementById('bg-color-hex').value = tema.card_bg_color;
        document.getElementById('bg-color-box').style.background = tema.card_bg_color;
    }

    SOCIALS.forEach(net => {
        const tog = document.getElementById(`tog-${net.id}`);
        const inp = document.getElementById(`url-${net.id}`);
        const urlDiv = document.getElementById(`wrap-${net.id}`);
        const row = document.getElementById(`row-${net.id}`);
        if (tog && inp) {
            const val = r[net.id] || '';
            tog.checked = !!val;
            inp.value = val;
            urlDiv.classList.toggle('show', !!val);
            row.classList.toggle('active', !!val);
        }
    });

    const sec = formData.secciones || SECTIONS_DEF.map(s=>s.id);
    buildSectionOrder(sec);

    if (formData.imagenes?.logo) showImg('logo', formData.imagenes.logo);
    if (formData.imagenes?.hero_image) showImg('hero', formData.imagenes.hero_image);
    if (formData.imagenes?.card_bg) showImg('bg', formData.imagenes.card_bg);

    sendPreview();
}

function setVal(id, val) { const el = document.getElementById(id); if(el) el.value = val||''; }

// ── FORM LISTENERS ────────────────────────────────────
function setupFormListeners() {
    ['f-name','f-slogan','f-initials','f-hero-title','f-hero-desc','f-empresa','f-wa-main','color-hex','bg-color-hex'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => { liveUpdate(); markDirty(); });
    });
}

// ── COLLECT & PREVIEW ─────────────────────────────────
function liveUpdate() {
    formData = collectData();
    clearTimeout(debounce);
    debounce = setTimeout(sendPreview, 120);
}

function collectData() {
    const color = document.getElementById('color-hex').value || '#00E5FF';
    const bgColor = document.getElementById('bg-color-hex').value || '';
    const redes = {};
    SOCIALS.forEach(net => {
        const tog = document.getElementById(`tog-${net.id}`);
        const inp = document.getElementById(`url-${net.id}`);
        redes[net.id] = (tog?.checked && inp?.value.trim()) ? inp.value.trim() : '';
    });
    const secItems = document.querySelectorAll('#sections-list .drag-item');
    const secciones = [];
    secItems.forEach(item => {
        const cb = item.querySelector('input[type="checkbox"]');
        if (cb?.checked) secciones.push(item.dataset.sid);
    });
    return {
        tema: { color_primario: color, card_bg_color: bgColor },
        textos: {
            card_name: document.getElementById('f-name')?.value||'',
            card_slogan: document.getElementById('f-slogan')?.value||'',
            card_initials: document.getElementById('f-initials')?.value||'',
            hero_title: document.getElementById('f-hero-title')?.value||'',
            hero_desc: document.getElementById('f-hero-desc')?.value||'',
            empresa_nombre: document.getElementById('f-empresa')?.value||'',
        },
        imagenes: formData.imagenes || {},
        redes,
        secciones,
    };
}

function sendPreview() {
    const iframe = document.getElementById('preview-iframe');
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage({ type:'nexus-preview', content: formData }, '*');
}

// ── PUBLISH ───────────────────────────────────────────
async function publishChanges() {
    const btn = document.getElementById('btn-publish');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';
    setStatus('saving','Guardando...');
    try {
        formData = collectData();
        await currentUser.jwt(true);
        const token = currentUser.token.access_token;
        const path = `${tplPath}/data/content.json`;
        const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(formData, null, 2))));
        const body = { message:`Admin: Actualización de ${tplPath}`, content: b64 };
        if (contentSha) body.sha = contentSha;
        const res = await fetch(`/.netlify/git/github/contents/${path}`, {
            method:'PUT',
            headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
            body: JSON.stringify(body),
        });
        if (res.ok) {
            const d = await res.json();
            contentSha = d.content.sha;
            hasChanges = false;
            setStatus('saved','Publicado ✓');
            toast('¡Cambios publicados! En 1-2 min se verán en el sitio.', 'success');
        } else {
            const e = await res.json();
            throw new Error(e.message || 'Error al publicar');
        }
    } catch(e) {
        setStatus('error','Error al publicar');
        toast(`Error: ${e.message}`, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Publicar';
    }
}

function markDirty() {
    hasChanges = true;
    setStatus('','Sin publicar');
}

function setStatus(type, text) {
    const dot = document.getElementById('sdot');
    dot.className = 'status-dot' + (type ? ' '+type : '');
    document.getElementById('stxt').textContent = text;
}

// ── COLOR PICKER ──────────────────────────────────────
function setupColorPicker() {
    const native = document.getElementById('color-native');
    const hex = document.getElementById('color-hex');
    const box = document.getElementById('color-box');

    const apply = c => { native.value=c; hex.value=c; box.style.background=c; syncColorSwatches(c); liveUpdate(); markDirty(); };
    native.addEventListener('input', () => apply(native.value));
    hex.addEventListener('input', () => { if(/^#[0-9A-Fa-f]{6}$/.test(hex.value)) apply(hex.value); });
    document.querySelectorAll('.color-swatch').forEach(s => s.addEventListener('click', () => apply(s.dataset.c)));

    // Background color picker
    const bgNative = document.getElementById('bg-color-native');
    const bgHex = document.getElementById('bg-color-hex');
    const bgBox = document.getElementById('bg-color-box');

    const bgApply = c => { bgNative.value=c; bgHex.value=c; bgBox.style.background=c; liveUpdate(); markDirty(); };
    bgNative?.addEventListener('input', () => bgApply(bgNative.value));
    bgHex?.addEventListener('input', () => { if(/^#[0-9A-Fa-f]{6}$/.test(bgHex.value)) bgApply(bgHex.value); });
}

function syncColorSwatches(c) {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.c.toLowerCase()===c.toLowerCase()));
}

// ── SOCIAL NETWORKS ───────────────────────────────────
function buildSocials() {
    document.getElementById('social-list').innerHTML = SOCIALS.map(net => `
        <div class="social-row" id="row-${net.id}">
            <div class="social-row-top">
                <div class="social-badge" style="background:${net.color}20;color:${net.color}"><i class="fab ${net.icon}"></i></div>
                <span class="social-lbl">${net.label}</span>
                <label class="toggle"><input type="checkbox" id="tog-${net.id}"><span class="toggle-track"></span></label>
            </div>
            <div class="social-url" id="wrap-${net.id}">
                <input type="text" id="url-${net.id}" class="form-input" placeholder="${net.ph}" style="margin-top:8px">
                ${net.hint ? `<div class="form-hint">${net.hint}</div>` : ''}
            </div>
        </div>
    `).join('');

    SOCIALS.forEach(net => {
        document.getElementById(`tog-${net.id}`).addEventListener('change', e => {
            const show = e.target.checked;
            document.getElementById(`wrap-${net.id}`).classList.toggle('show', show);
            document.getElementById(`row-${net.id}`).classList.toggle('active', show);
            liveUpdate(); markDirty();
        });
        document.getElementById(`url-${net.id}`).addEventListener('input', () => { liveUpdate(); markDirty(); });
    });
}

// ── SECTIONS BUILDER ──────────────────────────────────
function buildSections() { buildSectionOrder(formData.secciones); }

function buildSectionOrder(orderedIds) {
    const list = document.getElementById('sections-list');
    const ordered = [];
    (orderedIds||[]).forEach(id => { const s=SECTIONS_DEF.find(x=>x.id===id); if(s) ordered.push({...s,on:true}); });
    SECTIONS_DEF.forEach(s => { if(!orderedIds?.includes(s.id)) ordered.push({...s,on:false}); });
    list.innerHTML = ordered.map(s => `
        <li class="drag-item" data-sid="${s.id}" draggable="true">
            <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
            <div class="drag-icon"><i class="fas ${s.icon}"></i></div>
            <span class="drag-label">${s.label}</span>
            <label class="toggle"><input type="checkbox" ${s.on?'checked':''}><span class="toggle-track"></span></label>
        </li>
    `).join('');
    list.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', () => { liveUpdate(); markDirty(); }));
    setupDnD();
}

// ── DRAG AND DROP ─────────────────────────────────────
function setupDnD() {
    const list = document.getElementById('sections-list');
    if (!list) return;
    let src = null;
    list.addEventListener('dragstart', e => { src = e.target.closest('.drag-item'); if(src) src.classList.add('dragging'); });
    list.addEventListener('dragover', e => {
        e.preventDefault();
        const tgt = e.target.closest('.drag-item');
        if (tgt && tgt !== src) {
            list.querySelectorAll('.drag-item').forEach(i=>i.classList.remove('dragover'));
            tgt.classList.add('dragover');
        }
    });
    list.addEventListener('drop', e => {
        e.preventDefault();
        const tgt = e.target.closest('.drag-item');
        if (tgt && src && tgt !== src) {
            const items = [...list.querySelectorAll('.drag-item')];
            if (items.indexOf(src) < items.indexOf(tgt)) list.insertBefore(src, tgt.nextSibling);
            else list.insertBefore(src, tgt);
            liveUpdate(); markDirty();
        }
    });
    list.addEventListener('dragend', () => { list.querySelectorAll('.drag-item').forEach(i=>i.classList.remove('dragging','dragover')); });
}

// ── IMAGE UPLOAD ──────────────────────────────────────
function setupImages() {
    setupImgInput('logo-file', 'logo-prev', 'logo-ph', 'logo');
    setupImgInput('hero-file', 'hero-prev', 'hero-ph', 'hero_image');
    setupImgInput('bg-file', 'bg-prev', 'bg-ph', 'card_bg');
}
function setupImgInput(fileId, prevId, phId, key) {
    document.getElementById(fileId)?.addEventListener('change', function() {
        const f = this.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = e => {
            showImg(prevId.replace('-prev',''), e.target.result);
            if (!formData.imagenes) formData.imagenes = {};
            formData.imagenes[key] = e.target.result;
            liveUpdate(); markDirty();
        };
        reader.readAsDataURL(f);
    });
}
function showImg(prefix, src) {
    const p = document.getElementById(`${prefix}-prev`);
    const ph = document.getElementById(`${prefix}-ph`);
    if (p) { p.src=src; p.style.display='block'; }
    if (ph) ph.style.display='none';
}

// ── TABS ──────────────────────────────────────────────
function setupTabs() {
    document.querySelectorAll('.nav-tab').forEach(t => t.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.sidebar-panel').forEach(x=>x.classList.remove('active'));
        t.classList.add('active');
        document.querySelector(`.sidebar-panel[data-panel="${t.dataset.tab}"]`)?.classList.add('active');
    }));
}

// ── PREVIEW CONTROLS ──────────────────────────────────
function setupPreviewControls() {
    document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('[data-view]').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        const iframe = document.getElementById('preview-iframe');
        iframe.src = b.dataset.view === 'card' ? '../' : '../#landing-screen';
    }));
    document.querySelectorAll('[data-device]').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('[data-device]').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        const wrap = document.getElementById('preview-wrap');
        wrap.className = `preview-wrap ${b.dataset.device}`;
    }));
}

// ── HELPERS ───────────────────────────────────────────
function toast(msg, type='info') {
    const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
    const colors = { success:'#10B981', error:'#EF4444', info:'#00E5FF' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas ${icons[type]}" style="color:${colors[type]};font-size:17px;flex-shrink:0"></i><span>${msg}</span>`;
    document.getElementById('toasts').appendChild(el);
    setTimeout(() => el.remove(), 4500);
}
function show(id) { document.getElementById(id)?.classList?.remove('hidden'); }
function hide(id) { document.getElementById(id)?.classList?.add('hidden'); }
