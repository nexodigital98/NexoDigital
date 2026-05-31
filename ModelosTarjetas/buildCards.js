const fs = require('fs');
const path = require('path');

const outputDir = path.join('d:', 'NEXUSDIGITAL', 'ModelosTarjetas', 'Tarjetas_Individuales');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// â”€â”€â”€ DATOS DE LOS 40 NICHOS â”€â”€â”€
const niches = [
    // ðŸ“– EL LIBRO
    { folder: "Abogado", name: "Defensa Legal", slogan: "Justicia con compromiso", color: "#D4AF37", metaphor: "book" },
    { folder: "AsesorFinanciero", name: "CapitalTrust", slogan: "Tu dinero en buenas manos", color: "#48BB78", metaphor: "book" },
    { folder: "OntanedaAuditors", name: "Ontaneda Auditors", slogan: "Precisión en cada cifra", color: "#63B3ED", metaphor: "book" },
    { folder: "ConsultorEmpresarial", name: "NexusConsulting", slogan: "Estrategia que genera valor", color: "#A0AEC0", metaphor: "book" },
    { folder: "Economista", name: "EconPro", slogan: "Análisis con visión global", color: "#4299E1", metaphor: "book" },
    { folder: "AutoraSordociega", name: "Dennys Suárez", slogan: "Inspiración que trasciende", color: "#B794F4", metaphor: "book" },
    { folder: "AcademiaIdiomas", name: "GlobalLingo", slogan: "Aprende sin límites", color: "#4299E1", metaphor: "book" },

    // ðŸ“± EL SMARTPHONE
    { folder: "ReparacionCelulares", name: "iFix", slogan: "Tu dispositivo, restaurado", color: "#63B3ED", metaphor: "phone" },
    { folder: "TecnicoComputadoras", name: "Soporte PC", slogan: "Soluciones que funcionan", color: "#4299E1", metaphor: "phone" },
    { folder: "Tecont", name: "Tecont", slogan: "Tecnología a tu medida", color: "#00E5FF", metaphor: "phone" },
    { folder: "AgenciaMarketing", name: "Marketing Digital", slogan: "Impulsa tu marca", color: "#FF0055", metaphor: "phone" },
    { folder: "Influencer", name: "Creators Hub", slogan: "Tu marca personal, viral", color: "#FF6B35", metaphor: "phone" },
    { folder: "CamarasSeguridad", name: "Seguridad y Vigilancia", slogan: "Vigilamos lo que amas", color: "#FC4444", metaphor: "phone" },

    // ðŸ½ï¸ EL MENÃš
    { folder: "Restaurante", name: "La Mesa", slogan: "Sabores que enamoran", color: "#F6AD55", metaphor: "menu" },
    { folder: "FrigorificoBuffet", name: "Frigorífico & Buffet", slogan: "Sabores que conquistan", color: "#FC4444", metaphor: "menu" },
    { folder: "DELIFROZEN", name: "DeliFrozen", slogan: "Sabor que se congela", color: "#76E4F7", metaphor: "menu" },

    // ðŸ“ LA CARPETA
    { folder: "DanielaBohorquezArquitecta", name: "DB Arquitectura", slogan: "Diseño que inspira vida", color: "#B0BEC5", metaphor: "folder" },
    { folder: "AgenteInmobiliario", name: "PrimeEstate", slogan: "Tu hogar ideal te espera", color: "#68D391", metaphor: "folder" },
    { folder: "OrganizadorEventos", name: "GalaEvents", slogan: "Momentos que no se olvidan", color: "#FBD38D", metaphor: "folder" },
    { folder: "AgenciaDeSeguros", name: "SeguroTotal", slogan: "Tu tranquilidad, protegida", color: "#4299E1", metaphor: "folder" },

    // ðŸ©º LA PLACA / CREDENCIAL
    { folder: "Dentista", name: "SmilePro", slogan: "La sonrisa que mereces", color: "#90CDF4", metaphor: "badge" },
    { folder: "DoctoresEspecialistas", name: "MediCenter", slogan: "Tu salud, nuestra prioridad", color: "#76E4F7", metaphor: "badge" },
    { folder: "EnfermerasCuidados", name: "CuidaSalud", slogan: "Cuidado con corazón", color: "#FBB6CE", metaphor: "badge" },
    { folder: "Quiropractico", name: "SpineAlign", slogan: "Alinea tu vida", color: "#81E6D9", metaphor: "badge" },
    { folder: "PsicologoTerapeuta", name: "MenteSerena", slogan: "Bienestar mental real", color: "#B794F4", metaphor: "badge" },
    { folder: "Nutricionista", name: "NutriBalance", slogan: "Alimenta tu bienestar", color: "#9AE6B4", metaphor: "badge" },
    { folder: "Veterinaria", name: "PetCare Vet", slogan: "Amor y salud", color: "#9AE6B4", metaphor: "badge" },

    // 🔧 LA CORTINA METÁLICA / GARAJE
    { folder: "MecanicaAutomotriz", name: "Taller Mecánico", slogan: "Motores en manos expertas", color: "#A0AEC0", metaphor: "garage" },
    { folder: "TallerMotos", name: "Taller de Motos", slogan: "Pasión sobre dos ruedas", color: "#FC4444", metaphor: "garage" },
    { folder: "AiresAcondicionados", name: "Clima Perfecto", slogan: "Confort en todo momento", color: "#76E4F7", metaphor: "garage" },
    { folder: "Carpintero", name: "Madera & Arte", slogan: "Craft con pasión", color: "#C05621", metaphor: "garage" },
    { folder: "LimpiezaHogar", name: "SparkleClean", slogan: "Tu hogar, impecable", color: "#81E6D9", metaphor: "garage" },

    // 🌸 EL ESPEJO DE BELLEZA
    { folder: "PeluqueriaSalonBelleza", name: "Glow Studio", slogan: "Tu belleza, nuestra pasión", color: "#FBB6CE", metaphor: "mirror" },
    { folder: "SpaDermocosmiatra", name: "Spa", slogan: "Tu piel, nuestra obra", color: "#D53F8C", metaphor: "mirror" },
    { folder: "EstudioYoga", name: "ZenFlow", slogan: "Equilibrio cuerpo y mente", color: "#B794F4", metaphor: "mirror" },
    { folder: "Nineras", name: "BabyCare", slogan: "Cuidado con amor infinito", color: "#FBB6CE", metaphor: "mirror" },

    // 📷 EL OBTURADOR DE CÁMARA
    { folder: "FotografoBodas", name: "LensRomance", slogan: "Capturamos tu gran día", color: "#ECC94B", metaphor: "folder" },
    { folder: "GimnasioEntrenador", name: "IronFit", slogan: "Supera tus límites", color: "#ECC94B", metaphor: "badge" },
    { folder: "AgenciaViajes", name: "Wanderlust", slogan: "Tu próxima aventura espera", color: "#81E6D9", metaphor: "folder" }
];

// Íconos SVG para Redes Sociales
const iconWA = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
const iconIG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.838-10.535a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>`;
const iconTT = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68l.01.02a6.36 6.36 0 003.38 5.47 6.3 6.3 0 003.87.69c3.55-.4 5.95-3.52 5.95-7.1V6.52a8.03 8.03 0 003.79 1.48V4.54a4.91 4.91 0 01-2.41-.85z"/></svg>`;
const iconIN = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

// Generador genérico de información (la estructura FUT superpuesta en la portada)
function getInfoLayout(niche) {
    return `
    <div class="fut-team-zone">
        <img src="../../${niche.folder}/img/hero/EQUIPO.png" alt="Equipo" onerror="this.style.display='none'" style="max-width: 100%; max-height: 100%; object-fit: contain;">
    </div>
    <div class="fut-content" style="box-sizing: border-box; background: rgba(10,10,12,0.8); padding: 15px 20px; border-radius: 12px; width: 88%; max-width: 280px; margin: 0 auto 20px auto; align-self: center; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h2 class="fut-title" style="color: ${niche.color}; text-align: center; margin: 0 0 5px 0;">${niche.name}</h2>
        <p class="fut-slogan" style="text-align: center; margin: 0 0 10px 0; color: #ccc;">${niche.slogan}</p>
        <div class="fut-divider" style="background: ${niche.color}; width: 80%; height: 1px; margin: 0 auto 15px auto;"></div>
        <div class="fut-socials" style="display: flex; justify-content: center; gap: 10px; width: 100%;">
            <a href="https://wa.me/" target="_blank" onclick="event.stopPropagation()" class="soc-circle" style="color: ${niche.color}; border-color: ${niche.color}; text-decoration: none; transition: transform 0.2s ease;">${iconWA}</a>
            <a href="https://instagram.com/" target="_blank" onclick="event.stopPropagation()" class="soc-circle" style="color: ${niche.color}; border-color: ${niche.color}; text-decoration: none; transition: transform 0.2s ease;">${iconIG}</a>
            <a href="https://tiktok.com/" target="_blank" onclick="event.stopPropagation()" class="soc-circle" style="color: ${niche.color}; border-color: ${niche.color}; text-decoration: none; transition: transform 0.2s ease;">${iconTT}</a>
            <a href="https://linkedin.com/" target="_blank" onclick="event.stopPropagation()" class="soc-circle" style="color: ${niche.color}; border-color: ${niche.color}; text-decoration: none; transition: transform 0.2s ease;">${iconIN}</a>
        </div>
        <button class="fut-btn" onclick="openAndRedirect(event)" style="background: linear-gradient(180deg, ${niche.color} 0%, #111 200%); color: #000; border: 1px solid ${niche.color}; width: 90%; padding: 12px; margin: 15px auto 5px auto; display: flex; justify-content: center; align-items: center; border-radius: 4px; font-weight: bold; text-transform: uppercase;">
            MÁS INFORMACIÓN ›
        </button>
    </div>`;
}

function buildBook(niche) {
    const html = `
    <div class="book-container card-wrapper" id="cardObj">
        <div class="book-scene">
            
            <!-- Parte derecha del libro (Páginas y contratapa) -->
            <div class="book-body-right">
                <!-- Stack de hojas derechas -->
                <div class="page-stack right-stack">
                    <div class="page-content">
                        <!-- Páginas en blanco -->
                    </div>
                </div>
                <!-- Sombra de lomo central -->
                <div class="spine-shadow-right"></div>
            </div>

            <!-- Parte izquierda del libro (Tapa frontal que gira) -->
            <div class="book-cover-front">
                <!-- Portada (Cara exterior) -->
                <div class="cover-exterior">
                    <div class="cover-border" style="border-color: ${niche.color};">
                        ${getInfoLayout(niche)}
                    </div>
                </div>
                
                <!-- Interior de la tapa (Cara interior / Página Izquierda) -->
                <div class="cover-interior">
                    <!-- Stack de hojas izquierdas pegadas a la tapa -->
                    <div class="page-stack left-stack">
                        <div class="page-content">
                            <!-- Páginas en blanco -->
                        </div>
                    </div>
                    <!-- Sombra de lomo central (lado izquierdo) -->
                    <div class="spine-shadow-left"></div>
                </div>
            </div>

            <!-- Portal de luz para la transición (queda en el centro) -->
            <div class="portal-light"></div>

        </div>
    </div>`;

    const css = `
    /* ── Contenedor general ── */
    .book-container {
        perspective: 1600px;
        width: 320px; height: 480px;
        position: relative; margin: 0 auto;
    }

    /* Escena que se desplaza a la derecha al abrir para centrar el libro */
    .book-scene {
        width: 100%; height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card-wrapper.open .book-scene {
        transform: translateX(80px) scale(0.95);
    }

    /* ── Cuerpo del Libro (Derecha) ── */
    .book-body-right {
        position: absolute; inset: 0;
        background: linear-gradient(to right, #2a160b 0%, #3a2214 100%);
        border-radius: 2px 6px 6px 2px;
        box-shadow: 10px 15px 30px rgba(0,0,0,0.6);
        transform-style: preserve-3d;
        z-index: 1;
    }

    /* ── Tapa del Libro (Izquierda) ── */
    .book-cover-front {
        position: absolute; inset: 0;
        transform-origin: left center;
        transform-style: preserve-3d;
        transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10;
    }
    .card-wrapper.open .book-cover-front {
        transform: rotateY(-150deg);
    }

    /* Cara exterior de la tapa */
    .cover-exterior {
        position: absolute; inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(1px);
        background: linear-gradient(135deg, #2a2520 0%, #1c1812 100%);
        border-left: 14px solid #14110e;
        border-radius: 4px 2px 2px 4px;
        padding: 12px;
        box-shadow: 5px 5px 20px rgba(0,0,0,0.8);
    }

    /* Prevenir que CUALQUIER elemento hijo traspase la parte de atrás */
    .cover-exterior * {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .cover-border {
        width: 100%; height: 100%; border: 2px solid;
        border-radius: 2px 10px 10px 2px;
        position: relative; overflow: hidden;
        display: flex; flex-direction: column;
    }

    /* Cara interior de la tapa (gira 180deg para verse cuando el libro está abierto) */
    .cover-interior {
        position: absolute; inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: rotateY(180deg) translateZ(1px);
        background: linear-gradient(135deg, #2a2520 0%, #1c1812 100%);
        border-radius: 2px 4px 4px 2px;
    }

    /* ── Páginas Realistas (Stacks) ── */
    .page-stack {
        position: absolute;
        top: 6px; bottom: 6px; /* Margen superior e inferior de la tapa */
        background: #fdfaf4;
        overflow: hidden;
        z-index: 5;
    }
    
    /* Grosor de las páginas derechas */
    .right-stack {
        left: 4px; right: 6px;
        border-radius: 2px 5px 5px 2px;
        box-shadow: 
            inset -2px 0 5px rgba(0,0,0,0.05),
            1px 1px 1px #e6e0d4, 2px 2px 1px #d9d3c5, 3px 3px 1px #ccc5b6, 4px 4px 2px rgba(0,0,0,0.2);
    }
    
    /* Grosor de las páginas izquierdas (en la tapa) */
    .left-stack {
        left: 6px; right: 4px;
        border-radius: 5px 2px 2px 5px;
        box-shadow: 
            inset 2px 0 5px rgba(0,0,0,0.05),
            -1px 1px 1px #e6e0d4, -2px 2px 1px #d9d3c5, -3px 3px 1px #ccc5b6, -4px 4px 2px rgba(0,0,0,0.2);
    }

    /* Sombras curvas del lomo central para dar volumen 3D al papel */
    .spine-shadow-right {
        position: absolute; top: 6px; bottom: 6px; left: 4px; width: 40px;
        background: linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, transparent 100%);
        pointer-events: none; z-index: 5;
    }
    .spine-shadow-left {
        position: absolute; top: 6px; bottom: 6px; right: 4px; width: 40px;
        background: linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, transparent 100%);
        pointer-events: none; z-index: 5;
    }

    /* Líneas pautadas eliminadas a petición del usuario */
    .page-content { padding: 40px 20px; height: 100%; }
    `;

    return { html, css };
}


function buildGeneric(niche) {
    const html = `
    <div class="generic-container card-wrapper" id="cardObj">
        <div class="generic-card">
            ${getInfoLayout(niche)}
            <div class="portal-light"></div>
        </div>
    </div>`;
    const css = `
    .generic-container { perspective: 2000px; width: 320px; height: 480px; }
    .generic-card { width: 100%; height: 100%; background: linear-gradient(135deg, #2a2520 0%, #1f1b16 100%); border-radius: 20px; border: 2px solid ${niche.color}; display: flex; flex-direction: column; overflow: hidden; position: relative; transition: transform 0.8s; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
    .card-wrapper.open .generic-card { transform: scale(1.2) rotateY(180deg); }
    .card-wrapper.open .portal-light { opacity: 1; width: 200vw; height: 200vw; }`;
    return { html, css };
}

function buildMenu(niche) {
    const html = `
    <div class="menu-container card-wrapper" id="cardObj">
        <!-- Wrapper 3D para que todo el menú (panel y base) gire junto -->
        <div class="menu-structure">
            <!-- Panel de acrílico con 2 tornillos dorados visibles en la parte superior -->
            <div class="acrylic-panel">
                <div class="screen-flash"></div>
                <!-- Reflejos del acrílico (cristal) -->
                <div class="glass-shine-left"></div>
                <div class="glass-shine-top"></div>
                <!-- Tornillos dorados visibles -->
                <div class="gold-screw gold-screw-l"></div>
                <div class="gold-screw gold-screw-r"></div>
                <!-- Borde inferior metálico -->
                <div class="panel-bottom-bar"></div>
                <!-- Contenido -->
                <div class="panel-content">
                    ${getInfoLayout(niche)}
                </div>
            </div>
            <!-- Base 3D realista (Cilíndrica de madera oscura/mármol) -->
            <div class="premium-base">
                <div class="base-top"></div>
                <div class="base-front"></div>
            </div>
        </div>
    </div>`;
    
    const css = `
    .menu-container {
        width: 340px;
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        perspective: 1500px; /* Perspectiva en el contenedor principal */
    }
    
    /* Contenedor que agrupa la tarjeta y la base para girar juntos */
    .menu-structure {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    /* Panel de acrílico estilo cristal oscuro */
    .acrylic-panel {
        width: 300px;
        flex: 1;
        /* Acrílico oscuro semitransparente con tinte del color de la marca */
        background: linear-gradient(160deg, rgba(20,20,30,0.92) 0%, rgba(10,10,18,0.97) 100%);
        border: 2px solid rgba(200, 215, 240, 0.5);
        border-bottom: none;
        border-radius: 10px 10px 0 0;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        /* Sombra y glow de acrílico premium */
        box-shadow:
            0 -4px 30px rgba(0,0,0,0.5),
            inset 0 0 40px rgba(${niche.color.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.05),
            0 0 0 1px rgba(255,255,255,0.08);
        z-index: 5;
    }
    
    /* Reflejo izquierdo de cristal */
    .glass-shine-left {
        position: absolute; top: 0; left: 0; width: 30%; height: 100%;
        background: linear-gradient(to right, rgba(255,255,255,0.07) 0%, transparent 100%);
        pointer-events: none; z-index: 20; border-radius: 8px 0 0 0;
    }
    /* Reflejo superior de cristal */
    .glass-shine-top {
        position: absolute; top: 0; left: 0; width: 100%; height: 35%;
        background: linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%);
        pointer-events: none; z-index: 20;
    }
    
    /* Tornillos dorados en la parte superior del panel */
    .gold-screw {
        position: absolute; top: 18px;
        width: 14px; height: 14px;
        background: radial-gradient(circle at 35% 30%, #ffe680, #c8a020 50%, #8a6010 100%);
        border-radius: 50%;
        z-index: 25;
        box-shadow: 0 2px 6px rgba(0,0,0,0.7), 0 0 4px rgba(212,175,55,0.4), inset 0 1px 2px rgba(255,255,255,0.4);
    }
    /* Cruz del tornillo */
    .gold-screw::before, .gold-screw::after {
        content: '';
        position: absolute; top: 50%; left: 50%;
        background: rgba(0,0,0,0.4);
        border-radius: 1px;
    }
    .gold-screw::before { width: 8px; height: 1.5px; transform: translate(-50%,-50%); }
    .gold-screw::after  { width: 1.5px; height: 8px; transform: translate(-50%,-50%); }
    .gold-screw-l { left: 22px; }
    .gold-screw-r { right: 22px; }
    
    /* Barra metálica dorada en la base del panel (donde entra en el pedestal) */
    .panel-bottom-bar {
        position: absolute; bottom: 0; left: -2px; right: -2px;
        height: 14px;
        background: linear-gradient(to bottom, #c8a23a 0%, #a8821a 50%, #d4af37 100%);
        box-shadow: 0 4px 10px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.3);
        z-index: 15;
    }
    
    /* Contenido del panel */
    .panel-content {
        flex-grow: 1; display: flex; flex-direction: column;
        position: relative; z-index: 10; height: 100%;
        padding-top: 10px;
    }
    .panel-content .fut-top-right { top: 15px; right: 15px; z-index: 10; }
    .panel-content .fut-team-zone { margin-top: 30px; height: 210px; display: flex; align-items: center; justify-content: center; }
    .panel-content .fut-team-zone img { filter: drop-shadow(0 10px 20px rgba(0,0,0,0.9)); }
    .panel-content .fut-content { justify-content: center; padding-bottom: 25px; margin-top: 15px; flex-grow: 0; }
    .panel-content .fut-btn { width: 82%; justify-content: center; border-radius: 6px; padding: 11px; margin-top: 10px; font-size: 13px; box-shadow: 0 4px 20px ${niche.color}50; letter-spacing: 1px; }
    
    /* Base 3D Realista - Cilindro de madera premium */
    .premium-base {
        width: 240px;
        height: 55px;
        position: relative;
        margin-top: -10px; /* El acrílico entra dentro de la base */
        z-index: 20;
        flex-shrink: 0;
        filter: drop-shadow(0 25px 25px rgba(0,0,0,0.8));
    }
    
    /* Superficie superior ovalada del cilindro */
    .base-top {
        width: 100%;
        height: 40px;
        background: #2a2a2a;
        background-image: linear-gradient(to right, #0a0a0a 0%, #1a1a1a 15%, #333 50%, #1a1a1a 85%, #0a0a0a 100%);
        border-radius: 50%;
        position: absolute;
        top: 0;
        z-index: 2;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: inset 0 0 15px rgba(0,0,0,0.9);
    }
    
    /* Cuerpo frontal grueso del cilindro */
    .base-front {
        width: 100%;
        height: 35px;
        background: #1a1a1a;
        background-image: linear-gradient(to right, #050505 0%, #111 15%, #2a2a2a 50%, #111 85%, #050505 100%);
        position: absolute;
        top: 20px; /* Comienza en la mitad de la altura de base-top */
        border-radius: 0 0 120px 120px / 0 0 40px 40px;
        z-index: 1;
        border-bottom: 2px solid #000;
        box-shadow: inset 0 -2px 5px rgba(0,0,0,0.5);
    }
    
    /* Opcional: un toque de brillo en el frente de la base */
    .base-front::after {
        content: ''; position: absolute; top: 0; left: 15%; width: 70%; height: 100%;
        background: linear-gradient(to bottom, rgba(255,255,255,0.07), transparent);
        border-radius: 0 0 120px 120px / 0 0 40px 40px;
        pointer-events: none;
    }
    
    /* Animación de clic con giro 3D (dar la vuelta) */
    .menu-container { perspective: 1500px; }
    
    /* El giro 3D de 180 grados mientras hace zoom se aplica a toda la estructura */
    .card-wrapper.open .menu-structure { 
        transform: translateY(10%) scale(3.5) rotateY(180deg); 
    }
    
    /* Para que la parte de atrás del giro sea un panel oscuro realista (la parte de atrás del menú) */
    .menu-structure::after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: #111216; /* Color oscuro del reverso */
        transform: rotateY(180deg) translateZ(1px);
        backface-visibility: hidden; 
        border-radius: 10px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
    }
    .acrylic-panel, .premium-base {
        backface-visibility: hidden;
    }
    
    /* Inmersión total oscura (cubre los huecos que falten en pantalla) */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #111216; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.4s ease 0.5s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html: html.replace('<div class="screen-flash"></div>', ''), css };
}

function buildFolder(niche) {
    const html = `
    <div class="folder-container card-wrapper" id="cardObj">
        <div class="folder-scene">
            
            <!-- Cuerpo de la Agenda (Derecha / Interior) -->
            <div class="folder-body-right">
                <!-- Textura interior de la agenda -->
                <div class="leather-texture"></div>
                
                <!-- Stack de hojas derechas -->
                <div class="page-stack right-stack">
                    <div class="page-content"></div>
                </div>
                <!-- Sombra de lomo central -->
                <div class="spine-shadow-right"></div>
            </div>

            <!-- Tapa de la Agenda (Izquierda) -->
            <div class="folder-cover-front">
                <!-- Portada (Cara exterior) -->
                <div class="cover-exterior">
                    <div class="leather-texture"></div>
                    <!-- Lomo izquierdo de cuero -->
                    <div class="portfolio-spine">
                        <div class="stitches"></div>
                    </div>
                    <div class="portfolio-content">
                        ${getInfoLayout(niche)}
                    </div>
                </div>
                
                <!-- Interior de la tapa (Cara interior) -->
                <div class="cover-interior">
                    <div class="leather-texture"></div>
                    <!-- Stack de hojas izquierdas pegadas a la tapa -->
                    <div class="page-stack left-stack">
                        <div class="page-content"></div>
                    </div>
                    <div class="spine-shadow-left"></div>
                </div>
            </div>

            <!-- Broche lateral (unido a la contratapa, envuelve hacia adelante) -->
            <div class="portfolio-clasp">
                <div class="clasp-button"></div>
            </div>

            <!-- Portal de luz para la transición (queda en el centro) -->
            <div class="portal-light"></div>

        </div>
    </div>`;

    const css = `
    /* ── Contenedor general ── */
    .folder-container {
        perspective: 1600px;
        width: 340px; height: 530px;
        position: relative; margin: 0 auto;
    }

    /* Escena que se desplaza a la derecha al abrir para centrar la agenda */
    .folder-scene {
        width: 100%; height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card-wrapper.open .folder-scene {
        transform: translateX(85px) scale(0.95);
        transition-delay: 0.3s;
    }

    /* ── Cuerpo de la Agenda (Derecha) ── */
    .folder-body-right {
        position: absolute; inset: 0;
        background: radial-gradient(circle at 50% 50%, #1a1a1c 0%, #0d0d0f 100%);
        border-radius: 8px;
        box-shadow: 10px 15px 30px rgba(0,0,0,0.6);
        transform-style: preserve-3d;
        z-index: 1;
    }

    /* ── Tapa de la Agenda (Izquierda) ── */
    .folder-cover-front {
        position: absolute; inset: 0;
        transform-origin: left center;
        transform-style: preserve-3d;
        transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0s;
        z-index: 10;
    }
    .card-wrapper.open .folder-cover-front {
        transform: rotateY(-150deg);
        transition-delay: 0.3s;
    }

    /* Cara exterior de la tapa */
    .cover-exterior {
        position: absolute; inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(1px);
        background: radial-gradient(circle at 50% 50%, #1a1a1c 0%, #0d0d0f 100%);
        border-radius: 8px;
        box-shadow: 5px 5px 20px rgba(0,0,0,0.8);
        display: flex;
        overflow: hidden;
    }
    
    /* Prevenir que CUALQUIER elemento hijo traspase la parte de atrás */
    .cover-exterior * {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    /* Lomo izquierdo de cuero */
    .portfolio-spine {
        width: 45px; height: 100%;
        background: linear-gradient(to right, #1a1a1a 0%, #2c2c2c 20%, #151515 80%, #0a0a0a 100%);
        position: relative; z-index: 15;
        box-shadow: 8px 0 20px rgba(0,0,0,0.8);
        border-right: 1px solid #000;
        display: flex; justify-content: center;
        flex-shrink: 0;
    }
    .stitches {
        width: 2px; height: 96%; margin-top: 8px;
        background-image: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.12) 50%);
        background-size: 100% 14px;
    }

    /* Contenido de la tapa */
    .portfolio-content {
        position: relative; z-index: 10; flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; padding-top: 15px;
    }
    .portfolio-content .fut-top-right { top: 15px; right: 25px; }
    .portfolio-content .fut-team-zone { margin-top: 25px; height: 210px; display: flex; align-items: center; justify-content: center; }
    .portfolio-content .fut-team-zone img { filter: drop-shadow(0 15px 30px rgba(0,0,0,0.9)); }
    .portfolio-content .fut-content { justify-content: center; padding-bottom: 25px; margin-top: 15px; flex-grow: 0; }
    .portfolio-content .fut-btn { width: 80%; justify-content: center; border-radius: 4px; padding: 12px; margin-top: 15px; font-size: 14px; box-shadow: 0 4px 15px ${niche.color}40; border: 1px solid ${niche.color}; text-transform: uppercase; font-family: 'Cinzel', serif; letter-spacing: 2px; }

    /* Cara interior de la tapa */
    .cover-interior {
        position: absolute; inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: rotateY(180deg) translateZ(1px);
        background: radial-gradient(circle at 50% 50%, #1a1a1c 0%, #0d0d0f 100%);
        border-radius: 8px;
    }

    /* Textura de cuero (se aplica a ambas caras) */
    .leather-texture {
        position: absolute; inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 3px 3px;
        pointer-events: none; z-index: 1;
    }

    /* ── Broche lateral ── */
    .portfolio-clasp {
        position: absolute; right: -16px; top: 50%; margin-top: -45px;
        width: 32px; height: 90px;
        background: linear-gradient(to right, #111, #2a2a2a 50%, #111);
        border-radius: 0 10px 10px 0;
        z-index: 20;
        box-shadow: 6px 6px 15px rgba(0,0,0,0.7), inset 1px 0 2px rgba(255,255,255,0.15);
        display: flex; align-items: center; justify-content: center;
        border: 1px solid #000; border-left: none;
        transform-origin: left center;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0.8s; /* Al cerrar, el broche se cierra de último */
    }
    .clasp-button {
        width: 16px; height: 16px;
        background: radial-gradient(circle at 30% 30%, #e0e0e0, #888);
        border-radius: 50%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.9);
    }
    
    /* Al abrir: El broche rota hacia atrás primero */
    .card-wrapper.open .portfolio-clasp {
        transform: rotateY(160deg);
        transition-delay: 0s; /* El broche se abre inmediatamente al hacer clic */
    }

    /* ── Páginas (Hojas en blanco) ── */
    .page-stack {
        position: absolute;
        top: 10px; bottom: 10px; /* Margen de la tapa */
        background: #fdfaf4;
        overflow: hidden;
        z-index: 10;
    }
    
    /* Grosor de hojas derechas */
    .right-stack {
        left: 5px; right: 8px;
        border-radius: 2px 5px 5px 2px;
        box-shadow: 
            inset -2px 0 5px rgba(0,0,0,0.05),
            1px 1px 1px #e6e0d4, 2px 2px 1px #d9d3c5, 3px 3px 1px #ccc5b6, 4px 4px 2px rgba(0,0,0,0.2);
    }
    
    /* Grosor de hojas izquierdas */
    .left-stack {
        left: 8px; right: 5px;
        border-radius: 5px 2px 2px 5px;
        box-shadow: 
            inset 2px 0 5px rgba(0,0,0,0.05),
            -1px 1px 1px #e6e0d4, -2px 2px 1px #d9d3c5, -3px 3px 1px #ccc5b6, -4px 4px 2px rgba(0,0,0,0.2);
    }

    /* Sombras curvas del lomo central para dar volumen 3D al papel */
    .spine-shadow-right {
        position: absolute; top: 10px; bottom: 10px; left: 5px; width: 40px;
        background: linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, transparent 100%);
        pointer-events: none; z-index: 15;
    }
    .spine-shadow-left {
        position: absolute; top: 10px; bottom: 10px; right: 5px; width: 40px;
        background: linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, transparent 100%);
        pointer-events: none; z-index: 10;
    }

    .page-content { padding: 40px 20px; height: 100%; }
    `;
    return { html, css };
}

function buildPhone(niche) {
    const html = `
    <div class="phone-container card-wrapper" id="cardObj">
        <div class="phone">
            <!-- Botones físicos laterales -->
            <div class="phone-btn mute"></div>
            <div class="phone-btn vol-up"></div>
            <div class="phone-btn vol-down"></div>
            <div class="phone-btn power"></div>

            <div class="phone-screen">
                <!-- Flash para simular que se enciende la pantalla -->
                <div class="screen-flash"></div>

                <!-- Barra de estado simulada -->
                <div class="status-bar">
                    <span class="time">9:41</span>
                    <div class="dynamic-island"><div class="camera"></div></div>
                    <div class="icons">📶 🔋</div>
                </div>
                
                <!-- Reflejo del cristal -->
                <div class="glass-glare"></div>

                <div class="screen-content">
                    ${getInfoLayout(niche)}
                </div>
                
                <!-- Barra inferior de inicio (Home Indicator de iOS) -->
                <div class="home-indicator"></div>
            </div>
        </div>
    </div>`;
    const css = `
    .phone-container { perspective: 2000px; width: 340px; height: 600px; position: relative; }
    
    .phone { width: 100%; height: 100%; background: #222; border-radius: 45px; box-shadow: inset 0 0 3px 2px #555, 0 20px 40px rgba(0,0,0,0.8); position: relative; z-index: 5; padding: 12px; transition: transform 0.9s ease-in-out, box-shadow 0.9s ease-in-out; }
    
    .phone-btn { position: absolute; background: #333; border-radius: 2px; }
    .mute { width: 3px; height: 25px; left: -3px; top: 100px; }
    .vol-up { width: 3px; height: 50px; left: -3px; top: 140px; }
    .vol-down { width: 3px; height: 50px; left: -3px; top: 200px; }
    .power { width: 3px; height: 70px; right: -3px; top: 160px; }
    
    .phone-screen { width: 100%; height: 100%; background: radial-gradient(circle at 50% 35%, ${niche.color}25 0%, #050508 60%); border-radius: 33px; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    
    .status-bar { width: 100%; height: 35px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; position: absolute; top: 0; left: 0; z-index: 30; font-family: sans-serif; font-size: 12px; font-weight: bold; color: #fff; pointer-events: none; }
    .dynamic-island { width: 100px; height: 28px; background: #000; border-radius: 20px; position: absolute; left: 50%; top: 8px; transform: translateX(-50%); display: flex; justify-content: flex-end; align-items: center; padding-right: 10px; box-shadow: inset 0 0 2px rgba(255,255,255,0.2); }
    .camera { width: 10px; height: 10px; background: #111; border-radius: 50%; box-shadow: inset 0 0 2px #000, 0 0 1px rgba(255,255,255,0.1); }
    .icons { font-size: 10px; letter-spacing: 2px; }
    
    .glass-glare { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(to bottom right, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.0) 40%, transparent 100%); pointer-events: none; z-index: 20; transform: rotate(15deg); }
    
    .home-indicator { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 120px; height: 4px; background: rgba(255,255,255,0.8); border-radius: 4px; z-index: 40; pointer-events: none; }
    
    .screen-content { flex-grow: 1; display: flex; flex-direction: column; padding-top: 35px; position: relative; z-index: 10; height: 100%; }
    
    /* Adjust FUT layout for phone screen */
    .screen-content .fut-top-left { top: 45px; left: 20px; }
    .screen-content .fut-top-right { top: 45px; right: 20px; }
    .screen-content .fut-team-zone { margin-top: 25px; height: 210px; display: flex; align-items: center; justify-content: center; }
    .screen-content .fut-team-zone img { filter: drop-shadow(0 10px 20px rgba(0,0,0,0.9)); }
    .screen-content .fut-content { justify-content: center; padding-bottom: 0; margin-top: 35px; flex-grow: 0; }
    .screen-content .fut-btn { width: 85%; justify-content: center; border-radius: 25px; padding: 12px; margin-top: 10px; font-size: 14px; box-shadow: 0 4px 15px ${niche.color}40; border: none; letter-spacing: 1px; }
    
    /* Animación de clic (Zoom al interior de la pantalla en blanco) */
    .screen-flash { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff; opacity: 0; pointer-events: none; z-index: 50; transition: opacity 0.6s ease; }
    .card-wrapper.open .screen-flash { opacity: 1; }
    .card-wrapper.open .phone { transform: scale(4) translateY(-5%); box-shadow: 0 0 100px rgba(255,255,255,0.5); }
    
    /* Efecto Flash global para cubrir toda la pantalla del monitor de blanco */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #fff; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.4s ease 0.4s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html, css };
}

function buildBadge(niche) {
    const isNurse = niche.folder === 'EnfermerasCuidados';
    
    // Configuración según el rol
    const bgGradient = isNurse 
        ? 'linear-gradient(180deg, #e35a84 0%, #af234e 50%, #610723 100%)' 
        : 'linear-gradient(180deg, #007fb5 0%, #00608c 100%)';
        
    const wave1Color = isNurse ? 'rgba(255, 105, 180, 0.35)' : 'rgba(0, 229, 255, 0.25)';
    const wave2Color = isNurse ? 'rgba(175, 35, 78, 0.45)' : 'rgba(0, 127, 181, 0.4)';
    
    const badgeTag = isNurse ? 'NURSE CARD' : 'DOCTOR CARD';
    
    // SVG de logo según rol
    const logoSVG = isNurse 
        ? `<svg class="clinic-logo-icon" viewBox="0 0 64 64" fill="none" stroke="${niche.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <!-- Cofia de Enfermera Elegante -->
            <path d="M12 34c4-12 12-16 20-16s16 4 20 16" stroke-width="4.5" />
            <path d="M12 34l3 8h34l3-8H12z" stroke-width="3" fill="${niche.color}20" />
            <!-- Cruz en la cofia -->
            <path d="M28 26h8M32 22v8" stroke-width="3" />
           </svg>`
        : `<svg class="clinic-logo-icon" viewBox="0 0 64 64" fill="none" stroke="${niche.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <!-- Estetoscopio y Cruz de Doctor -->
            <path d="M24 20h-6v12h6v6h12v-6h6v-12h-6v-6h-12v6z" stroke-width="4.5" />
            <path d="M32 32c0 4-6 6-6 9s3 3 6 3 6-1 6-3-6-5-6-9z" stroke-width="3" />
           </svg>`;

    const html = `
    <div class="badge-container card-wrapper" id="cardObj">
        
        <!-- Tarjeta ID de PVC Premium (Diseño Personalizado según Rol) -->
        <div class="id-badge" style="background: ${bgGradient};">
            <!-- Orificio superior de la tarjeta (donde se engancha el broche) -->
            <div class="id-badge-hole"></div>
            
            <!-- Efecto de brillo de plástico y ondas de fondo fluidas -->
            <div class="badge-glare"></div>
            <div class="bg-wave-1" style="background: radial-gradient(circle, ${wave1Color} 0%, transparent 70%);"></div>
            <div class="bg-wave-2" style="background: radial-gradient(circle, ${wave2Color} 0%, transparent 80%);"></div>
            <div class="screen-flash"></div>
            
            <div class="badge-content">
                <!-- Foto de Perfil Circular con borde doble brillante -->
                <div class="badge-avatar-container">
                    <div class="badge-avatar-circle" style="border-color: ${niche.color};">
                        <img class="badge-avatar-img" src="../../${niche.folder}/img/hero/EQUIPO.png" alt="${niche.name}">
                    </div>
                </div>

                <!-- Logo Personalizado según la Profesión -->
                <div class="clinic-logo-container">
                    ${logoSVG}
                    <div class="clinic-logo-text">${niche.name}</div>
                </div>

                <!-- Información (DOCTOR / NURSE CARD) -->
                <div class="badge-info-section">
                    <div class="badge-tag">${badgeTag}</div>
                    <div class="badge-id-number">Id No. : 1526 8348 9933 4110</div>
                    <div class="badge-website">www.nexusdigital.pe</div>
                </div>

                <!-- Redes Sociales Outline en Blanco -->
                <div class="badge-footer-socials">
                    <div class="badge-soc-outline">${iconWA}</div>
                    <div class="badge-soc-outline">${iconIG}</div>
                    <div class="badge-soc-outline">${iconTT}</div>
                    <div class="badge-soc-outline">${iconIN}</div>
                </div>

                <!-- Botón de acción premium -->
                <button class="badge-action-btn" onclick="openAndRedirect(event)" style="background: linear-gradient(180deg, ${niche.color} 0%, #111 200%); color: #000; border: 1px solid ${niche.color}; font-weight: 700;">
                    MÁS INFORMACIÓN ›
                </button>
            </div>
        </div>
    </div>`;

    const css = `
    .badge-container { width: 310px; height: 510px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; margin: 0 auto; perspective: 1500px; }
    
    /* Gafete PVC - Transiciones fluidas y 3D */
    .id-badge {
        width: 300px; height: 500px;
        border-radius: 20px;
        position: relative; overflow: hidden;
        box-shadow: 0 20px 45px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3);
        display: flex; flex-direction: column; z-index: 5;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.8s ease;
    }
    
    /* Orificio rectangular de sujeciÃ³n superior en la tarjeta */
    .id-badge-hole {
        position: absolute; top: 15px; left: 50%; transform: translateX(-50%);
        width: 45px; height: 12px;
        background: #000;
        border-radius: 6px;
        box-shadow: inset 0 3px 6px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.2);
        z-index: 22;
    }
    
    /* Capa de brillo cristalino/plÃ¡stico de la imagen */
    .id-badge::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 30%, transparent 50%, rgba(255,255,255,0.04) 70%, transparent 100%);
        z-index: 18; pointer-events: none;
    }
    
    /* Efecto 3D de inclinaciÃ³n al pasar el mouse por la tarjeta */
    .badge-container:hover .id-badge {
        transform: translateY(-8px) rotateY(12deg) rotateX(6deg);
        box-shadow: 0 30px 60px rgba(0,0,0,0.85), 0 0 30px rgba(255,255,255,0.15);
    }
    
    /* Ondas curvas del fondo */
    .bg-wave-1 {
        position: absolute; top: -50px; left: -100px; width: 500px; height: 350px;
        pointer-events: none; z-index: 1;
    }
    .bg-wave-2 {
        position: absolute; bottom: -100px; right: -150px; width: 450px; height: 350px;
        pointer-events: none; z-index: 1;
    }
    
    /* Brillo plÃ¡stico del PVC que se mueve con el hover */
    .badge-glare {
        position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.03) 60%, transparent 100%);
        pointer-events: none; z-index: 20;
        transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .badge-container:hover .badge-glare {
        transform: translate(25px, 25px);
    }
    
    /* Contenido interno alineado perfectamente vertical */
    .badge-content { 
        position: relative; z-index: 15; height: 100%; display: flex; 
        flex-direction: column; align-items: center; padding: 35px 20px 20px 20px; 
        backface-visibility: hidden;
    }
    
    /* Contenedor del Avatar Circular */
    .badge-avatar-container {
        width: 100%; display: flex; justify-content: center; margin-bottom: 15px; margin-top: 5px;
    }
    .badge-avatar-circle {
        width: 155px; height: 155px;
        border-radius: 50%;
        border: 5px solid;
        /* Borde doble de alta gama y brillo */
        box-shadow: 0 0 35px rgba(255, 255, 255, 0.35), inset 0 0 20px rgba(0,0,0,0.6);
        outline: 2px solid rgba(255, 255, 255, 0.4);
        outline-offset: -3px;
        overflow: hidden;
        display: flex; justify-content: center; align-items: center;
        background: #022035;
        position: relative;
    }
    .badge-avatar-img {
        width: 100%; height: 100%;
        object-fit: cover;
        object-position: center top;
    }
    
    /* Logo de la ClÃ­nica / Empresa */
    .clinic-logo-container {
        display: flex; align-items: center; justify-content: center;
        gap: 8px; margin-bottom: 12px; width: 100%;
    }
    .clinic-logo-icon {
        width: 26px; height: 26px; flex-shrink: 0;
    }
    .clinic-logo-text {
        font-size: 17px; font-weight: 700; color: #fff;
        font-family: 'Plus Jakarta Sans', sans-serif;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    /* Textos del Gafete */
    .badge-info-section {
        text-align: center; margin-bottom: 12px; width: 100%;
    }
    .badge-tag {
        font-size: 16px; font-weight: 700; color: #fff;
        letter-spacing: 2px; text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        margin-bottom: 4px;
    }
    .badge-id-number {
        font-size: 10px; color: rgba(255,255,255,0.75);
        letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .badge-website {
        font-size: 13px; font-weight: 600; color: #fff;
        letter-spacing: 0.5px;
    }
    
    /* Redes Sociales Outline en Blanco */
    .badge-footer-socials {
        display: flex; gap: 12px; justify-content: center; margin-bottom: 15px; width: 100%;
    }
    .badge-soc-outline {
        width: 28px; height: 28px; border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.6);
        display: flex; justify-content: center; align-items: center;
        color: #fff; background: transparent; transition: all 0.3s ease;
    }
    .badge-soc-outline svg {
        width: 14px; height: 14px; fill: currentColor;
    }
    .badge-soc-outline:hover {
        border-color: #fff; background: rgba(255,255,255,0.15); transform: scale(1.1);
    }
    
    /* BotÃ³n de acciÃ³n integrado */
    .badge-action-btn {
        width: 85%; padding: 10px; border-radius: 20px;
        font-family: 'Oswald', sans-serif; font-size: 13px;
        cursor: pointer; text-transform: uppercase; letter-spacing: 1px;
        border-bottom: 3px solid rgba(0,0,0,0.4) !important;
        transition: transform 0.2s ease;
        font-weight: 700;
    }
    .badge-action-btn:hover {
        transform: scale(1.03);
    }
    
    /* AnimaciÃ³n inmersiva con giro 3D de 180Â° */
    .screen-flash { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0); opacity: 0; pointer-events: none; z-index: 50; transition: opacity 0.6s ease; }
    .card-wrapper.open .screen-flash { opacity: 1; }
    
    .card-wrapper.open .id-badge { 
        transform: scale(3.5) rotateY(180deg) translateY(-5%); 
        box-shadow: 0 0 100px rgba(255,255,255,0.6); 
    }
    
    /* Reverso realista oscuro de PVC */
    .id-badge::after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: #111216; /* Negro premium trasero */
        transform: rotateY(180deg) translateZ(1px);
        backface-visibility: hidden; 
        border-radius: 20px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.9);
        z-index: 10;
    }
    `;
    return { html, css };
}

function buildGarage(niche) {
    // Reimaginado: en lugar de una cortina que tapa todo, usamos un Panel Acrílico/Vidrio premium
    const html = `
    <div class="acrylic-container card-wrapper" id="cardObj">
        <div class="acrylic-panel">
            <div class="acrylic-glow" style="background: radial-gradient(circle at top left, ${niche.color} 0%, transparent 70%);"></div>
            <div class="acrylic-glow-bottom" style="background: radial-gradient(circle at bottom right, ${niche.color} 0%, transparent 60%);"></div>
            
            <div class="acrylic-content">
                ${getInfoLayout(niche)}
            </div>
            
            <!-- Reflejo curvo del vidrio en la esquina -->
            <div class="acrylic-glare"></div>
        </div>
    </div>`;

    const css = `
    .acrylic-container { 
        perspective: 1500px; width: 340px; height: 530px; position: relative; margin: 0 auto; 
        transform-style: preserve-3d;
    }
    
    .acrylic-panel {
        width: 100%; height: 100%;
        background: rgba(10, 20, 35, 0.25);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 20px;
        position: relative; overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-top: 1px solid rgba(255, 255, 255, 0.35);
        border-left: 1px solid rgba(255, 255, 255, 0.35);
        box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5);
        transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
        z-index: 5;
        transform-style: preserve-3d;
    }
    
    .acrylic-glow {
        position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        opacity: 0.15; pointer-events: none; z-index: 1;
        transform: translateZ(-10px);
    }
    
    .acrylic-glow-bottom {
        position: absolute; bottom: -50%; right: -50%; width: 200%; height: 200%;
        opacity: 0.1; pointer-events: none; z-index: 1;
        transform: translateZ(-10px);
    }

    .acrylic-glare {
        position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%);
        pointer-events: none; z-index: 20; border-radius: inherit;
        transform: translateZ(10px);
    }

    .acrylic-content {
        position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; padding-top: 20px;
        transform: translateZ(40px);
    }
    
    .acrylic-content .fut-team-zone { margin-top: 25px; height: 210px; display: flex; align-items: center; justify-content: center; z-index: 12; }
    .acrylic-content .fut-team-zone img { filter: drop-shadow(0 15px 25px rgba(0,0,0,0.9)); max-width: 100%; object-fit: contain; }
    
    .acrylic-content .fut-content { 
        justify-content: center; padding-bottom: 25px; margin-top: 15px; flex-grow: 0; 
        background: rgba(10, 10, 12, 0.4) !important; 
        border: 1px solid rgba(255, 255, 255, 0.08) !important; 
        border-radius: 12px !important;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
    }
    
    .acrylic-content .fut-btn { 
        width: 80%; justify-content: center; border-radius: 4px; padding: 12px; margin-top: 15px; 
        font-size: 14px; box-shadow: 0 4px 15px ${niche.color}40; border: 1px solid ${niche.color}; 
        text-transform: uppercase; font-family: 'Oswald', sans-serif; letter-spacing: 1px; 
    }
    
    /* Al abrir: la tarjeta gira completamente (360 grados) mientras hace zoom inmersivo y se desvanece */
    .card-wrapper.open .acrylic-panel {
        transform: scale(3.5) rotateY(360deg) translateY(-5%);
        opacity: 0;
    }
    
    /* Efecto inmersión total con el color de la marca */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #050608; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.4s ease 0.5s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html, css };
}

function buildMirror(niche) {
    const html = `
    <div class="mirror-container card-wrapper" id="cardObj">
        <!-- Espejo de cuerpo entero ovalado elegante -->
        <div class="luxury-mirror">
            <!-- Tira LED perimetral cálida y continua -->
            <div class="led-strip"></div>
            
            <!-- Cristal del espejo limpio sin efectos blancos -->
            <div class="mirror-glass">
                <!-- Contenido elegante dentro de la zona del espejo -->
                <div class="mirror-content">
                    ${getInfoLayout(niche)}
                </div>
            </div>
        </div>
    </div>`;

    const css = `
    .mirror-container { perspective: 2000px; width: 310px; height: 580px; position: relative; margin: 0 auto; }
    
    .luxury-mirror {
        width: 100%; height: 100%;
        background: linear-gradient(135deg, #161616 0%, #050505 100%);
        border-radius: 155px; /* Forma de cápsula más estilizada */
        position: relative; overflow: hidden;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 30px 60px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8);
        transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        z-index: 5;
    }
    
    /* Tira LED moderna y equilibrada */
    .led-strip {
        position: absolute; inset: 12px;
        border-radius: 145px;
        border: 4px solid ${niche.color};
        box-shadow: 0 0 15px ${niche.color}, 0 0 35px ${niche.color}80, inset 0 0 10px ${niche.color}50;
        pointer-events: none; z-index: 20;
    }
    
    /* Superficie del espejo con reflejo suave estático */
    .mirror-glass {
        position: absolute; inset: 12px;
        border-radius: 145px;
        background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%);
        overflow: hidden; z-index: 10;
    }
    
    /* Sin efectos de brillo blanco - solo queda el morado y el LED perimetral */
    
    /* Ajustes del contenido para espejo de belleza */
    .mirror-content {
        position: relative; z-index: 15; height: 100%; display: flex; flex-direction: column; padding-top: 40px;
    }
    .mirror-content .fut-top-right { top: 25px; right: 30px; }
    .mirror-content .fut-team-zone { margin-top: 15px; height: 190px; display: flex; align-items: center; justify-content: center; }
    .mirror-content .fut-team-zone img { filter: drop-shadow(0 15px 25px rgba(0,0,0,0.9)); }
    
    /* Hacemos que el contenido flote directamente sobre el espejo sin ningún recuadro */
    .mirror-content .fut-content { 
        background: transparent !important;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none !important;
        border: none !important;
        justify-content: center; padding-bottom: 25px; margin-top: 15px; flex-grow: 0; 
    }
    
    .mirror-content .fut-btn { 
        width: 80%; justify-content: center; border-radius: 20px; padding: 12px; margin-top: 15px; font-size: 14px; 
        box-shadow: 0 4px 15px ${niche.color}30; border: 1px solid ${niche.color}; text-transform: uppercase; 
        font-family: 'Cinzel', serif; letter-spacing: 1px;
        color: #ffffff !important; /* Fuerza el texto a blanco en lugar de negro/invertido */
        background: linear-gradient(135deg, ${niche.color} 0%, rgba(20,20,20,0.8) 100%) !important; /* Gradiente más suave */
    }
    
    /* --- ANIMACIÓN: GIRO DE FRENTE AL REVÉS + EXPANSIÓN --- */
    
    .mirror-container { transform-style: preserve-3d; }
    
    /* Fase 1 (0-50%): gira de frente al revés (0 → 180°) */
    /* Fase 2 (50-100%): ya en el revés, se expande hasta llenar la pantalla */
    @keyframes mirrorFlip {
        0%   { transform: rotateY(0deg)   scale(1);   }
        55%  { transform: rotateY(360deg) scale(1);   }
        100% { transform: rotateY(360deg) scale(4.5); }
    }
    .card-wrapper.open .luxury-mirror {
        animation: mirrorFlip 1.2s ease-in-out 1 forwards;
        box-shadow: 0 0 60px ${niche.color}, 0 0 120px ${niche.color}50;
    }
    
    /* Flash del color del nicho que cubre la pantalla al terminar la expansión */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: ${niche.color}; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.3s ease 0.95s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html, css };
}

function buildCamera(niche) {
    const html = `
    <div class="camera-container card-wrapper" id="cardObj">
        <div class="camera-lens">
            <!-- Anillos concÃ©ntricos del lente -->
            <div class="lens-ring outer-ring"></div>
            <div class="lens-ring focus-ring"></div>
            <div class="lens-ring aperture-ring"></div>
            
            <!-- Obturador / Shutter de 6 aspas -->
            <div class="lens-shutter">
                <div class="shutter-blade blade-1"></div>
                <div class="shutter-blade blade-2"></div>
                <div class="shutter-blade blade-3"></div>
                <div class="shutter-blade blade-4"></div>
                <div class="shutter-blade blade-5"></div>
                <div class="shutter-blade blade-6"></div>
            </div>
            
            <!-- Cristal interno y reflejo verde/azul de Ã³ptica premium -->
            <div class="lens-glass">
                <div class="lens-reflection"></div>
                <div class="camera-content">
                    ${getInfoLayout(niche)}
                </div>
            </div>
        </div>
    </div>`;

    const css = `
    .camera-container { perspective: 2000px; width: 340px; height: 530px; position: relative; margin: 0 auto; }
    
    .camera-lens {
        width: 100%; height: 100%;
        background: radial-gradient(circle at 50% 50%, #15161a 0%, #070709 100%);
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        height: 340px; /* Hacemos que sea circular */
        position: absolute; top: 95px; left: 0;
        overflow: hidden;
        border: 8px solid #282a35; /* Cuerpo de lente de metal */
        box-shadow: 0 25px 50px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.05);
        transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        z-index: 5;
    }
    
    /* Anillos mecÃ¡nicos del lente */
    .lens-ring {
        position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05);
    }
    .outer-ring { inset: 5px; border-width: 3px; border-color: #1a1c23; }
    .focus-ring { inset: 20px; border-style: dashed; border-color: rgba(255,255,255,0.1); }
    .aperture-ring { inset: 35px; border-width: 2px; }
    
    /* Aspas del obturador */
    .lens-shutter {
        position: absolute; inset: 45px;
        border-radius: 50%;
        background: #08090b;
        z-index: 10;
        overflow: hidden;
        transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.8s ease;
    }
    
    .shutter-blade {
        position: absolute; width: 100%; height: 100%;
        background: linear-gradient(135deg, #111 0%, #252830 100%);
        border: 1px solid #000;
        transform-origin: top left;
        transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
    }
    .blade-1 { top: 0; left: 0; transform: rotate(0deg); }
    .blade-2 { top: 0; left: 0; transform: rotate(60deg); }
    .blade-3 { top: 0; left: 0; transform: rotate(120deg); }
    .blade-4 { top: 0; left: 0; transform: rotate(180deg); }
    .blade-5 { top: 0; left: 0; transform: rotate(240deg); }
    .blade-6 { top: 0; left: 0; transform: rotate(300deg); }
    
    /* Apertura: al abrir, las aspas se deslizan hacia afuera girando */
    .card-wrapper.open .lens-shutter {
        transform: scale(0) rotate(90deg);
        opacity: 0;
    }
    
    /* Cristal Ã³ptico detrÃ¡s del obturador */
    .lens-glass {
        position: absolute; inset: 45px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(13, 160, 240, 0.15) 0%, rgba(5, 5, 8, 0.95) 75%);
        z-index: 5;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    /* Reflejo azul/verde de lente profesional */
    .lens-reflection {
        position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, transparent 40%, transparent 60%, rgba(183, 148, 244, 0.1) 100%);
        pointer-events: none; z-index: 12;
    }
    
    .camera-content {
        position: relative; z-index: 15; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 20px; align-items: center; justify-content: center;
    }
    .camera-content .fut-top-right { top: 25px; right: 25px; }
    .camera-content .fut-team-zone { margin-top: 10px; height: 110px; display: flex; align-items: center; justify-content: center; }
    .camera-content .fut-team-zone img { height: 95px; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.9)); }
    .camera-content .fut-content { justify-content: center; padding-bottom: 5px; margin-top: 5px; flex-grow: 0; }
    .camera-content .fut-title { font-size: 15px; }
    .camera-content .fut-slogan { font-size: 8px; }
    .camera-content .fut-divider { width: 50%; margin-bottom: 8px; }
    .camera-content .fut-socials { margin-bottom: 8px; transform: scale(0.85); }
    .camera-content .fut-btn { width: 75%; justify-content: center; border-radius: 20px; padding: 8px; font-size: 11px; box-shadow: 0 4px 10px rgba(236,201,75,0.3); border: 1px solid ${niche.color}; }
    
    /* Al hacer clic: zoom inmersivo que simula entrar al lente */
    .card-wrapper.open .camera-lens {
        transform: scale(4.5) rotate(-10deg);
        box-shadow: 0 0 100px rgba(0,0,0,0.9);
    }
    
    /* Fundido negro cinematogrÃ¡fico total */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #050508; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.4s ease 0.5s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html, css };
}

function buildShield(niche) {
    const html = `
    <div class="shield-container card-wrapper" id="cardObj">
        <div class="tactical-shield">
            <!-- PatrÃ³n de fibra de carbono de fondo -->
            <div class="carbon-bg"></div>
            
            <!-- Remaches metÃ¡licos en los bordes del escudo -->
            <div class="shield-bolts">
                <div class="bolt bolt-1"></div>
                <div class="bolt bolt-2"></div>
                <div class="bolt bolt-3"></div>
                <div class="bolt bolt-4"></div>
                <div class="bolt bolt-5"></div>
                <div class="bolt bolt-6"></div>
            </div>
            
            <div class="shield-inner-border"></div>
            
            <div class="shield-content">
                ${getInfoLayout(niche)}
            </div>
        </div>
    </div>`;

    const css = `
    .shield-container { perspective: 2000px; width: 340px; height: 530px; position: relative; margin: 0 auto; }
    
    .tactical-shield {
        width: 100%; height: 100%;
        background: linear-gradient(135deg, #1b1d24 0%, #0d0e12 100%);
        /* Forma de escudo militar/tÃ¡ctico premium con clip-path */
        clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
        border: 4px solid #ecc94b; /* Bordes dorados/amarillo de marca */
        position: relative; overflow: hidden;
        box-shadow: 0 25px 45px rgba(0,0,0,0.8), inset 0 0 25px rgba(0,0,0,0.9);
        transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        z-index: 5;
    }
    
    /* Fibra de carbono militar */
    .carbon-bg {
        position: absolute; inset: 0;
        background-color: #15171e;
        background-image: 
            linear-gradient(45deg, #0d0f14 25%, transparent 25%), 
            linear-gradient(-45deg, #0d0f14 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #0d0f14 75%), 
            linear-gradient(-45deg, transparent 75%, #0d0f14 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        opacity: 0.15; pointer-events: none; z-index: 1;
    }
    
    /* Tornillos tÃ¡cticos industriales */
    .shield-bolts { position: absolute; inset: 0; pointer-events: none; z-index: 10; }
    .bolt {
        position: absolute; width: 12px; height: 12px;
        background: radial-gradient(circle at 35% 30%, #fff, #777 60%, #333 100%);
        border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.6);
    }
    .bolt-1 { top: 15px; left: 20px; }
    .bolt-2 { top: 15px; right: 20px; }
    .bolt-3 { top: 50%; left: 10px; transform: translateY(-50%); }
    .bolt-4 { top: 50%; right: 10px; transform: translateY(-50%); }
    .bolt-5 { bottom: 30%; left: 35px; }
    .bolt-6 { bottom: 30%; right: 35px; }
    
    .shield-inner-border {
        position: absolute; inset: 12px;
        clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
        border: 2px dashed rgba(236, 201, 75, 0.4);
        pointer-events: none; z-index: 5;
    }
    
    /* Contenido adaptado para escudo */
    .shield-content {
        position: relative; z-index: 15; height: 100%; display: flex; flex-direction: column; padding-top: 20px;
    }
    .shield-content .fut-top-right { top: 25px; right: 25px; }
    .shield-content .fut-team-zone { margin-top: 35px; height: 200px; display: flex; align-items: center; justify-content: center; }
    .shield-content .fut-team-zone img { filter: drop-shadow(0 15px 25px rgba(0,0,0,0.9)); }
    .shield-content .fut-content { justify-content: center; padding-bottom: 35px; margin-top: 15px; flex-grow: 0; }
    .shield-content .fut-btn { 
        width: 80%; justify-content: center; border-radius: 4px; padding: 12px; margin-top: 15px; font-size: 14px; 
        box-shadow: 0 4px 15px ${niche.color}40; border: 1px solid ${niche.color}; text-transform: uppercase; 
        font-family: 'Oswald', sans-serif; letter-spacing: 2px;
    }
    
    /* Al abrir: rotaciÃ³n 3D del escudo y zoom */
    .card-wrapper.open .tactical-shield {
        transform: scale(3.5) rotateX(10deg) translateY(-5%);
        box-shadow: 0 0 100px rgba(236, 201, 75, 0.4);
    }
    
    /* Fundido dorado/negro */
    body::after { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0d0e12; opacity: 0; pointer-events: none; z-index: 9999; transition: opacity 0.4s ease 0.5s; }
    body.flash-active::after { opacity: 1; }
    `;
    return { html, css };
}

function compileHTML(niche) {
    let components;
    if (niche.metaphor === 'book') components = buildBook(niche);
    else if (niche.metaphor === 'phone') components = buildPhone(niche);
    else if (niche.metaphor === 'menu') components = buildMenu(niche);
    else if (niche.metaphor === 'folder') components = buildFolder(niche);
    else if (niche.metaphor === 'badge') components = buildBadge(niche);
    else if (niche.metaphor === 'garage') components = buildGarage(niche);
    else if (niche.metaphor === 'mirror') components = buildMirror(niche);
    else if (niche.metaphor === 'camera') components = buildCamera(niche);
    else if (niche.metaphor === 'shield') components = buildShield(niche);
    else components = buildGeneric(niche);

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarjeta 3D - ${niche.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Oswald:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #03050A; display: flex; justify-content: center; align-items: center; min-height: 100vh; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; }
        
        .fut-top-right { position: absolute; top: 15px; right: 15px; z-index: 5; }
        .fut-top-right img { width: 30px; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.8)); }
        
        .fut-team-zone { width: 100%; height: 180px; margin-top: 25px; display: flex; justify-content: center; align-items: flex-end; position: relative; z-index: 2; }
        .fut-team-zone img { height: 110%; object-fit: contain; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.8)); }
        
        .fut-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding-bottom: 20px; position: relative; z-index: 3; }
        .fut-title { font-family: 'Cinzel', serif; font-size: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); margin-bottom: 5px; text-transform: uppercase; }
        .fut-slogan { font-size: 9px; color: #FFF; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; margin-bottom: 15px; }
        .fut-divider { width: 70%; height: 1px; margin-bottom: 15px; opacity: 0.6; }
        
        .fut-socials { display: flex; gap: 10px; margin-bottom: 15px; }
        .soc-circle { width: 30px; height: 30px; border-radius: 50%; border: 1px solid; display: flex; justify-content: center; align-items: center; overflow: hidden; background: transparent; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; cursor: pointer; }
        .soc-circle:hover { transform: scale(1.18); background: ${niche.color}22; box-shadow: 0 0 10px ${niche.color}, 0 0 20px ${niche.color}88; border-color: ${niche.color} !important; }
        .soc-circle:hover svg { filter: drop-shadow(0 0 4px ${niche.color}); }
        
        .fut-btn { padding: 8px 15px; font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; text-transform: uppercase; border-radius: 4px; display: flex; align-items: center; gap: 8px; z-index: 20; position: relative; border-bottom: 3px solid rgba(0,0,0,0.4) !important; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .fut-btn:hover { box-shadow: 0 0 15px ${niche.color}, 0 0 30px ${niche.color}66; transform: translateY(-1px); }
        
        .portal-light { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 0; height: 0; background: ${niche.color}; border-radius: 50%; box-shadow: 0 0 80px 80px ${niche.color}99, 0 0 180px 180px ${niche.color}44; opacity: 0; transition: all 1s ease-in-out; pointer-events: none; z-index: 100; }
        
        ${components.css}
    </style>
</head>
<body>
    ${components.html}
    <script>
        function openAndRedirect(event) {
            if(event) event.stopPropagation();
            const card = document.getElementById('cardObj');
            card.classList.add('open');
            document.body.classList.add('flash-active');
            setTimeout(() => {
                window.location.href = '../../${niche.folder}/index.html#landing-screen';
            }, 1000); 
        }

        // ── Efecto 3D Tilt — idéntico a NexusDigital ──
        const card   = document.getElementById('cardObj');
        const MAX_TILT = 12; // igual que NexusDigital (máx 12 grados)

        // Tilt via MOUSE — solo activo cuando el cursor está DENTRO de la tarjeta
        card.addEventListener('mousemove', function(e) {
            if (card.classList.contains('open')) return;
            
            // Eliminar el lag inicial si el cursor ya estaba dentro al cargar la página
            if (card.style.transition !== 'none') card.style.transition = 'none';
            
            const rect    = card.getBoundingClientRect();
            const centerX = rect.left + rect.width  / 2;
            const centerY = rect.top  + rect.height / 2;
            const rotY    =  ((e.clientX - centerX) / (rect.width  / 2)) * MAX_TILT;
            const rotX    = -((e.clientY - centerY) / (rect.height / 2)) * MAX_TILT;
            card.style.transform = 'perspective(1200px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
        });

        card.addEventListener('mouseenter', function() {
            // Igual que NexusDigital: quitamos transition para que el tilt sea instantáneo
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', function() {
            if (card.classList.contains('open')) return;
            // Rebote suave al soltar — cubic-bezier igual que NexusDigital
            card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.transform  = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        });

        // ── Franja de brillo automática (Shimmer) tipo NexusDigital ──
        const shimmerStyle = document.createElement('style');
        shimmerStyle.innerHTML = '@keyframes cardShimmerAnim { 0% { opacity: 0; transform: translateX(-150%) skewX(-20deg); } 20% { opacity: 0.5; } 50% { opacity: 0.8; } 80% { opacity: 0.5; } 100% { opacity: 0; transform: translateX(250%) skewX(-20deg); } } .shimmer-layer { position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient(90deg, transparent 0%, ${niche.color}15 30%, ${niche.color}55 50%, ${niche.color}15 70%, transparent 100%); z-index: 9999; pointer-events: none; opacity: 0; animation: cardShimmerAnim 4s ease-in-out infinite 1.5s; border-radius: inherit; }';
        document.head.appendChild(shimmerStyle);
        const shimmerDiv = document.createElement('div');
        shimmerDiv.className = 'shimmer-layer';

        // Buscar la cara frontal exacta de la tarjeta (según el tipo de nicho) para que la luz no se salga
        const faceSelector = '.book-cover-front, .generic-card, .acrylic-panel, .folder-cover-front, .phone-screen, .id-badge, .garage-door-frame, .luxury-mirror, .camera-lens, .tactical-shield';
        const cardFace = card.querySelector(faceSelector);
        
        if (cardFace) {
            // Aplicar el shimmer solo dentro del contenedor visual y evitar que rebase los bordes redondeados
            cardFace.style.overflow = 'hidden'; 
            cardFace.appendChild(shimmerDiv);
        } else {
            card.style.overflow = 'hidden'; 
            card.appendChild(shimmerDiv);
        }

        // Tilt via GIROSCOPIO — móviles (Android sin permiso / iOS con permiso)
        if (window.DeviceOrientationEvent) {
            function applyGyroTilt(beta, gamma) {
                if (!card || card.classList.contains('open')) return;
                const rotX = Math.min(Math.max(-(beta  - 30) * 0.4, -MAX_TILT), MAX_TILT);
                const rotY = Math.min(Math.max(  gamma        * 0.4, -MAX_TILT), MAX_TILT);
                card.style.transform = 'perspective(1200px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
            }
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                card.addEventListener('click', function() {
                    DeviceOrientationEvent.requestPermission().then(function(r) {
                        if (r === 'granted') window.addEventListener('deviceorientation', function(e) { applyGyroTilt(e.beta, e.gamma); }, true);
                    }).catch(console.error);
                }, { once: true });
            } else {
                window.addEventListener('deviceorientation', function(e) { applyGyroTilt(e.beta, e.gamma); }, true);
            }
        }

        // El clic en el fondo ya no activa la animación.
        // Solo el botón "MÁS INFORMACIÓN" tiene onclick="openAndRedirect(event)"
    </script>
</body>
</html>`;
}

niches.forEach(niche => {
    const htmlContent = compileHTML(niche);
    const fileName = path.join(outputDir, `${niche.folder}.html`);
    fs.writeFileSync(fileName, htmlContent, 'utf-8');
});
console.log(`âœ… Se han generado ${niches.length} tarjetas con ajustes visuales finales.`);


