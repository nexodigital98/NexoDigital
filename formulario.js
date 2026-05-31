/**
 * formulario.js — Sistema de Pre-Cita NexusDigital
 * Se activa cuando existe window.NEXUS_FORM_CONFIG en la página.
 * Renderiza el formulario, envía datos al webhook y redirige a Calendly.
 */
(function () {
    const cfg = window.NEXUS_FORM_CONFIG;
    if (!cfg) return;

    // ── Estilos del formulario ──────────────────────────────────────────────
    const style = document.createElement('style');
    style.innerHTML = `
        #nexus-form-overlay {
            display: none;
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(8px);
            z-index: 999998;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        #nexus-form-overlay.active { display: flex; }
        #nexus-form-box {
            background: rgba(10,18,35,0.98);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 35px 30px;
            max-width: 480px;
            width: 100%;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
        }
        #nexus-form-box h2 {
            font-size: 22px;
            margin-bottom: 5px;
            font-weight: 700;
        }
        #nexus-form-box .nf-subtitle {
            font-size: 13px;
            color: #aaa;
            margin-bottom: 25px;
        }
        .nf-group { margin-bottom: 18px; }
        .nf-group label {
            display: block;
            font-size: 13px;
            color: #ccc;
            margin-bottom: 6px;
            font-weight: 500;
        }
        .nf-group input,
        .nf-group textarea,
        .nf-group select {
            width: 100%;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.15);
            color: #fff;
            padding: 10px 14px;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.2s;
        }
        .nf-group input:focus,
        .nf-group textarea:focus,
        .nf-group select:focus {
            border-color: var(--sl-gold, #D4AF37);
        }
        .nf-group select option { background: #0a1223; }
        .nf-group textarea { resize: vertical; min-height: 80px; }
        .nf-radio-group { display: flex; gap: 12px; flex-wrap: wrap; }
        .nf-radio-btn {
            flex: 1;
            min-width: 80px;
            padding: 10px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            font-size: 13px;
            color: #ccc;
            transition: all 0.2s;
            user-select: none;
        }
        .nf-radio-btn.active {
            background: rgba(212,175,55,0.15);
            border-color: var(--sl-gold, #D4AF37);
            color: #fff;
        }
        #nexus-form-submit {
            width: 100%;
            background: var(--sl-gold, #D4AF37);
            color: #000;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s;
        }
        #nexus-form-submit:hover { opacity: 0.9; transform: translateY(-1px); }
        #nexus-form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .nf-close {
            position: absolute;
            top: 15px; right: 20px;
            font-size: 22px;
            cursor: pointer;
            color: #666;
            background: none;
            border: none;
        }
        .nf-success {
            text-align: center;
            padding: 20px 0;
        }
        .nf-success i { font-size: 50px; color: #00C853; margin-bottom: 15px; }
        .nf-success h3 { font-size: 20px; margin-bottom: 10px; }
        .nf-success p { color: #aaa; font-size: 14px; }
    `;
    document.head.appendChild(style);

    // ── HTML del Modal ──────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'nexus-form-overlay';

    const questions = cfg.preguntas.map((q, i) => {
        if (q.tipo === 'text' || q.tipo === 'tel' || q.tipo === 'email') {
            return `<div class="nf-group">
                <label>${q.label}</label>
                <input type="${q.tipo}" id="nf-q-${i}" placeholder="${q.placeholder || ''}" ${q.required ? 'required' : ''}>
            </div>`;
        }
        if (q.tipo === 'textarea') {
            return `<div class="nf-group">
                <label>${q.label}</label>
                <textarea id="nf-q-${i}" placeholder="${q.placeholder || ''}"></textarea>
            </div>`;
        }
        if (q.tipo === 'radio') {
            const opts = q.opciones.map(op =>
                `<div class="nf-radio-btn" data-qid="${i}" data-val="${op}">${op}</div>`
            ).join('');
            return `<div class="nf-group">
                <label>${q.label}</label>
                <div class="nf-radio-group">${opts}</div>
                <input type="hidden" id="nf-q-${i}">
            </div>`;
        }
        if (q.tipo === 'select') {
            const opts = q.opciones.map(op => `<option value="${op}">${op}</option>`).join('');
            return `<div class="nf-group">
                <label>${q.label}</label>
                <select id="nf-q-${i}"><option value="">-- Selecciona --</option>${opts}</select>
            </div>`;
        }
        return '';
    }).join('');

    overlay.innerHTML = `
        <div id="nexus-form-box">
            <button class="nf-close" id="nf-close-btn">&times;</button>
            <h2>${cfg.titulo || 'Antes de tu cita'}</h2>
            <p class="nf-subtitle">${cfg.subtitulo || 'Cuéntanos un poco para aprovechar mejor tu tiempo.'}</p>
            <div id="nf-form-content">
                ${questions}
                <button id="nexus-form-submit">
                    <i class="fas fa-calendar-check"></i>
                    ${cfg.boton || 'Agendar mi Cita'}
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);

    // ── Lógica de Radio Buttons ─────────────────────────────────────────────
    overlay.querySelectorAll('.nf-radio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const qid = btn.getAttribute('data-qid');
            overlay.querySelectorAll(`.nf-radio-btn[data-qid="${qid}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`nf-q-${qid}`).value = btn.getAttribute('data-val');
        });
    });

    // ── Abrir / Cerrar Modal ────────────────────────────────────────────────
    function openForm() { overlay.classList.add('active'); }
    function closeForm() { overlay.classList.remove('active'); }

    document.getElementById('nf-close-btn').addEventListener('click', closeForm);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeForm(); });

    // Activar todos los botones que tengan data-nexus-form="open"
    document.querySelectorAll('[data-nexus-form="open"]').forEach(btn => {
        btn.addEventListener('click', e => { e.preventDefault(); openForm(); });
    });

    // ── Enviar Formulario ───────────────────────────────────────────────────
    document.getElementById('nexus-form-submit').addEventListener('click', async () => {
        const btn = document.getElementById('nexus-form-submit');

        // Recolectar datos
        const datos = {};
        let valid = true;
        cfg.preguntas.forEach((q, i) => {
            const el = document.getElementById(`nf-q-${i}`);
            const val = el ? el.value.trim() : '';
            if (q.required && !val) {
                el.style.borderColor = '#FF3366';
                valid = false;
            } else {
                if (el) el.style.borderColor = '';
            }
            datos[q.label] = val || '—';
        });

        if (!valid) {
            btn.textContent = 'Completa los campos obligatorios';
            setTimeout(() => {
                btn.innerHTML = `<i class="fas fa-calendar-check"></i> ${cfg.boton || 'Agendar mi Cita'}`;
            }, 2000);
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Construir mensaje de WhatsApp como fallback
        let mensaje = `📋 *NUEVA PRE-CITA — ${cfg.negocio || 'NexusDigital'}*\n`;
        mensaje += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        cfg.preguntas.forEach(q => {
            const emoji = q.emoji || '•';
            mensaje += `${emoji} *${q.label}:* ${datos[q.label]}\n`;
        });
        mensaje += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        mensaje += `_Agendando cita ahora mismo..._`;

        // Si hay webhook (Make.com), enviar datos
        if (cfg.webhook) {
            try {
                await fetch(cfg.webhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ negocio: cfg.negocio, datos, mensaje })
                });
            } catch (e) {
                // Silently fail — fallback to WhatsApp
            }
        }

        // Siempre también abrir WhatsApp directo como respaldo
        const waUrl = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(mensaje)}`;

        // Mostrar éxito
        document.getElementById('nf-form-content').innerHTML = `
            <div class="nf-success">
                <i class="fas fa-check-circle"></i>
                <h3>¡Datos enviados!</h3>
                <p>En un momento te redirigimos para que elijas el horario de tu cita.</p>
            </div>`;

        setTimeout(() => {
            closeForm();
            // Si tiene Calendly, abrir en nueva pestaña
            if (cfg.calendly) {
                window.open(cfg.calendly, '_blank');
            }
            // Siempre enviar resumen a WhatsApp del negocio
            window.open(waUrl, '_blank');
        }, 1800);
    });
})();


