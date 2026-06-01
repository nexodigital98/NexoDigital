document.addEventListener("DOMContentLoaded", () => {
    // Check if we are in Edit Mode
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('edit')) return;

    // Inject CSS for the Simulator Panel
    const style = document.createElement('style');
    style.innerHTML = `
        #nexus-simulator {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 320px;
            max-width: calc(100vw - 40px);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(15px);
            border: 1px solid var(--sl-cyan);
            border-radius: 12px;
            padding: 20px;
            z-index: 999999;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            box-shadow: 0 10px 40px rgba(0, 229, 255, 0.2);
            transition: transform 0.3s ease;
        }
        #nexus-simulator.collapsed {
            transform: translateX(calc(100% + 40px));
        }
        #nexus-sim-toggle {
            position: absolute;
            left: -40px;
            top: 20px;
            width: 40px;
            height: 40px;
            background: var(--sl-cyan);
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px 0 0 8px;
            cursor: pointer;
            font-size: 20px;
        }
        .nexus-sim-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 10px;
        }
        .nexus-sim-header h3 {
            font-size: 18px;
            color: var(--sl-cyan);
            margin: 0;
            font-weight: 700;
        }
        .nexus-sim-group {
            margin-bottom: 15px;
        }
        .nexus-sim-group label {
            display: block;
            font-size: 12px;
            color: #aaa;
            margin-bottom: 5px;
        }
        .nexus-sim-input {
            width: 100%;
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: 'Outfit', sans-serif;
            outline: none;
        }
        .nexus-sim-input:focus {
            border-color: var(--sl-cyan);
        }
        .nexus-color-picker {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .nexus-color-swatch {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: transform 0.2s;
        }
        .nexus-color-swatch:hover {
            transform: scale(1.1);
        }
        .nexus-color-swatch.active {
            border-color: #fff;
        }
        .nexus-file-upload {
            background: rgba(0,229,255,0.1);
            border: 1px dashed var(--sl-cyan);
            padding: 10px;
            text-align: center;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            color: var(--sl-cyan);
        }
        .nexus-file-upload input {
            display: none;
        }
        .nexus-btn-submit {
            width: 100%;
            background: var(--sl-cyan);
            color: #000;
            border: none;
            padding: 12px;
            font-weight: 700;
            border-radius: 6px;
            margin-top: 15px;
            cursor: pointer;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s;
        }
        .nexus-btn-submit:hover {
            background: #fff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,229,255,0.4);
        }
    `;
    document.head.appendChild(style);

    // Simulator HTML
    const simDiv = document.createElement('div');
    simDiv.id = 'nexus-simulator';
    simDiv.innerHTML = `
        <div id="nexus-sim-toggle"><i class="fas fa-magic"></i></div>
        <div class="nexus-sim-header">
            <h3><i class="fas fa-paint-brush"></i> Simulador Web</h3>
            <p style="font-size: 11px; color:#aaa; margin:5px 0 0;">Visualiza tu marca en vivo</p>
        </div>
        
        <div class="nexus-sim-group">
            <label>Nombre del Negocio</label>
            <input type="text" id="sim-name" class="nexus-sim-input" placeholder="Ej. Estudio Legal Pérez">
        </div>
        
        <div class="nexus-sim-group">
            <label>Slogan o Especialidad</label>
            <input type="text" id="sim-slogan" class="nexus-sim-input" placeholder="Ej. Expertos en Derecho Penal">
        </div>
        
        <div class="nexus-sim-group">
            <label>Tu Logo</label>
            <label class="nexus-file-upload">
                <i class="fas fa-upload"></i> Subir desde dispositivo
                <input type="file" id="sim-logo" accept="image/*">
            </label>
        </div>

        <div class="nexus-sim-group">
            <label>Color Principal de Marca</label>
            <div class="nexus-color-picker">
                <div class="nexus-color-swatch" style="background:#D4AF37;" data-color="#D4AF37" data-glow="rgba(212,175,55,0.5)"></div>
                <div class="nexus-color-swatch" style="background:#00E5FF;" data-color="#00E5FF" data-glow="rgba(0,229,255,0.5)"></div>
                <div class="nexus-color-swatch" style="background:#FF3366;" data-color="#FF3366" data-glow="rgba(255,51,102,0.5)"></div>
                <div class="nexus-color-swatch" style="background:#00FF66;" data-color="#00FF66" data-glow="rgba(0,255,102,0.5)"></div>
                <div class="nexus-color-swatch" style="background:#9D00FF;" data-color="#9D00FF" data-glow="rgba(157,0,255,0.5)"></div>
            </div>
        </div>

        <div class="nexus-sim-group" style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
            <label>WhatsApp del Negocio <span style="color:#FF3366">*</span></label>
            <input type="text" id="sim-whatsapp" class="nexus-sim-input" placeholder="Ej. 593986777289">
            <p style="font-size: 10px; color:#aaa; margin-top:3px;">Aquí llegarán los datos de los formularios.</p>
        </div>

        <div class="nexus-sim-group">
            <label>Link de Calendly (Opcional)</label>
            <input type="text" id="sim-calendly" class="nexus-sim-input" placeholder="Ej. https://calendly.com/mi-negocio">
        </div>

        <button class="nexus-btn-submit" id="sim-submit">
            <i class="fab fa-whatsapp"></i> ¡Lo Quiero Así!
        </button>
    `;
    document.body.appendChild(simDiv);

    // --- LOGIC ---
    
    // Toggle Panel
    const panel = document.getElementById('nexus-simulator');
    
    // Auto-colapsar en móviles al cargar
    if (window.innerWidth <= 768) {
        panel.classList.add('collapsed');
    }

    document.getElementById('nexus-sim-toggle').addEventListener('click', () => {
        panel.classList.toggle('collapsed');
    });

    // Elements to change
    const cardTitle = document.querySelector('.fut-name-banner h2');
    const heroTitle = document.querySelector('.sl-hero-title'); // If exists
    const cardSlogan = document.querySelector('.card-slogan');
    const cardLogo = document.querySelector('.card-logo');

    // Live Text Update
    document.getElementById('sim-name').addEventListener('input', (e) => {
        if(cardTitle) cardTitle.innerText = e.target.value || 'Nombre del Negocio';
    });

    document.getElementById('sim-slogan').addEventListener('input', (e) => {
        if(cardSlogan) cardSlogan.innerText = e.target.value || 'Slogan de tu empresa';
    });

    // Live Logo Upload (Local Preview only)
    document.getElementById('sim-logo').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            if(cardLogo) cardLogo.src = objectUrl;
        }
    });

    // Live Color Update
    let selectedColorHex = '';
    const swatches = document.querySelectorAll('.nexus-color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            const color = swatch.getAttribute('data-color');
            const glow = swatch.getAttribute('data-glow');
            selectedColorHex = color;
            
            // Override CSS variables globally
            document.documentElement.style.setProperty('--sl-gold', color);
            document.documentElement.style.setProperty('--sl-cyan', color);
            document.documentElement.style.setProperty('--sl-glow', glow);
        });
    });

    // Submit & Generate Code
    document.getElementById('sim-submit').addEventListener('click', () => {
        let wa = document.getElementById('sim-whatsapp').value.replace(/[^0-9]/g, '');
        if (!wa) {
            alert('Por favor ingresa el número de WhatsApp del negocio.');
            document.getElementById('sim-whatsapp').focus();
            return;
        }

        const config = {
            n: document.getElementById('sim-name').value,
            s: document.getElementById('sim-slogan').value,
            c: selectedColorHex,
            t: window.location.pathname.split('/').slice(-2, -1)[0], // Gets the folder name (niche template name)
            w: wa,
            cal: document.getElementById('sim-calendly').value
        };

        // Convert JSON to Base64 code
        const base64Code = btoa(unescape(encodeURIComponent(JSON.stringify(config))));
        const finalCode = "NEXUS-" + base64Code;

        const hasPhoto = document.getElementById('sim-logo').files.length > 0;
        let msj = `Hola NexusDigital! Estuve probando el catálogo y me encantó la plantilla.
Este es mi código de diseño:
*${finalCode}*`;

        if (hasPhoto) {
            msj += `\n\n*(Te envío adjunto en este chat mi logo/fotos para que las integres).*`;
        }

        const encodedMsj = encodeURIComponent(msj);
        window.open(`https://wa.me/593986777289?text=${encodedMsj}`, '_blank');
    });
});

