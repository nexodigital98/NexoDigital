const fs = require('fs');
const path = require('path');

const rootDir = 'd:/NEXUSDIGITAL';

const nicheCopy = {
    'Abogado': {
        title: 'Seguridad y <span class="sl-glow-text">Respaldo Legal</span>',
        subtitle: 'Más que asesoría, le brindamos la tranquilidad de saber que su patrimonio y derechos están protegidos por expertos.',
        catalog: 'Revise nuestro dossier corporativo para conocer a fondo nuestras áreas de práctica y casos de éxito.',
        testimonial: 'Su profesionalismo y estrategia resolvieron un caso que parecía perdido. Recuperé mi tranquilidad.',
        faq1_q: '¿Cómo funciona la primera consulta?',
        faq1_a: 'Evaluamos los hechos, revisamos su documentación y trazamos una hoja de ruta legal clara desde el primer día.',
        faq2_q: '¿Manejan casos en otras ciudades?',
        faq2_a: 'Sí, representamos a clientes a nivel nacional y brindamos asesorías por videollamada para su comodidad.',
        location: 'Visítenos en nuestro despacho. Un ambiente privado y discreto diseñado para atender sus asuntos con absoluta confidencialidad.',
        address: 'Centro Empresarial, Zona Financiera'
    },
    'GimnasioEntrenador': {
        title: 'Transforma tu <span class="sl-glow-text">Cuerpo y Mente</span>',
        subtitle: 'No vendemos membresías, creamos un estilo de vida. Únete a una comunidad que te impulsa a superar tus límites diarios.',
        catalog: 'Descubre nuestros programas de entrenamiento, horarios de clases grupales y perfiles de nuestros coaches.',
        testimonial: 'Nunca pensé que entrenar se volvería mi momento favorito del día. Las instalaciones y el ambiente son increíbles.',
        faq1_q: '¿Necesito experiencia previa?',
        faq1_a: 'En absoluto. Nuestros entrenadores adaptarán las rutinas a tu nivel, desde principiantes hasta atletas avanzados.',
        faq2_q: '¿Ofrecen asesoría nutricional?',
        faq2_a: 'Sí, contamos con programas integrales que combinan entrenamiento personalizado y guía nutricional.',
        location: 'Entrena con el mejor equipamiento en un ambiente vibrante, climatizado y diseñado para inspirarte.',
        address: 'Av. Principal, Zona Deportiva'
    },
    'PeluqueriaSalonBelleza': {
        title: 'Realza tu <span class="sl-glow-text">Belleza Natural</span>',
        subtitle: 'Déjate mimar en un espacio pensado para tu relajación. Nuestros estilistas crearán un look que refleje tu verdadera esencia.',
        catalog: 'Explora nuestra galería de estilos, tratamientos capilares de vanguardia y servicios de spa relajante.',
        testimonial: 'El trato es exquisito y el resultado superó mis expectativas. Definitivamente mi nuevo salón de confianza.',
        faq1_q: '¿Qué productos utilizan?',
        faq1_a: 'Trabajamos exclusivamente con líneas premium y orgánicas que protegen y nutren tu cabello a profundidad.',
        faq2_q: '¿Es necesario agendar cita?',
        faq2_a: 'Recomendamos agendar previamente para asegurar que tengas todo el tiempo y la atención que mereces.',
        location: 'Un oasis de belleza en medio de la ciudad. Disfruta de un café mientras nos encargamos de ti.',
        address: 'Plaza Central, Local 5'
    },
    'Restaurante': {
        title: 'Un Festín para tus <span class="sl-glow-text">Sentidos</span>',
        subtitle: 'Cada plato cuenta una historia. Descubre una fusión de sabores auténticos en un ambiente acogedor e inolvidable.',
        catalog: 'Sumérgete en nuestro menú. Desde entradas artesanales hasta postres que deleitan el paladar.',
        testimonial: 'La explosión de sabores es inigualable y la atención te hace sentir en casa. Volveré sin dudarlo.',
        faq1_q: '¿Tienen opciones veganas/celíacas?',
        faq1_a: 'Por supuesto. Nuestro menú está diseñado para ser inclusivo, con opciones deliciosas para cada dieta.',
        faq2_q: '¿Hacen eventos privados?',
        faq2_a: 'Sí, reservamos espacios exclusivos para celebraciones íntimas y cenas corporativas.',
        location: 'Visítanos y déjate envolver por la música suave, la iluminación perfecta y un aroma irresistible.',
        address: 'Boulevard Gastronómico, Esquina'
    },
    'AgenciaViajes': {
        title: 'Diseñamos tu <span class="sl-glow-text">Próxima Aventura</span>',
        subtitle: 'No vendemos pasajes, creamos recuerdos. Nos encargamos de cada detalle para que tú solo te dediques a disfrutar.',
        catalog: 'Explora nuestros destinos exóticos, paquetes todo incluido y escapadas de fin de semana.',
        testimonial: 'Organizaron nuestra luna de miel y todo fue perfecto, desde los traslados hasta las cenas románticas.',
        faq1_q: '¿Ofrecen seguro de viaje?',
        faq1_a: 'Sí, todos nuestros paquetes premium incluyen cobertura médica y asistencia 24/7 en el extranjero.',
        faq2_q: '¿Pueden personalizar mi ruta?',
        faq2_a: 'Absolutamente. Diseñamos itinerarios a la medida basados en tus intereses y presupuesto.',
        location: 'Ven a planear tu viaje soñado con nuestros expertos tomando un café en nuestras cómodas oficinas.',
        address: 'Torre de Negocios, Piso 3'
    },
    'MecanicaAutomotriz': {
        title: 'Potencia y <span class="sl-glow-text">Seguridad en la Vía</span>',
        subtitle: 'Tu vehículo es tu herramienta de vida. Utilizamos tecnología de punta para garantizar un rendimiento impecable y viajes seguros.',
        catalog: 'Conoce nuestros servicios de mantenimiento preventivo, diagnóstico computarizado y detailing estético.',
        testimonial: 'El diagnóstico fue preciso, me explicaron todo claramente y me entregaron el auto brillante y a tiempo.',
        faq1_q: '¿Tienen garantía en reparaciones?',
        faq1_a: 'Todos nuestros trabajos cuentan con garantía certificada tanto en mano de obra como en repuestos originales.',
        faq2_q: '¿Ofrecen servicio de grúa?',
        faq2_a: 'Sí, contamos con rescate vial 24/7 para nuestros clientes afiliados dentro de la ciudad.',
        location: 'Instalaciones modernas, sala de espera con Wi-Fi y monitoreo transparente de tu vehículo.',
        address: 'Parque Industrial, Nave 12'
    },
    'AgenciaDeSeguros': {
        title: 'Protegemos <span class="sl-glow-text">lo que más Importa</span>',
        subtitle: 'La vida está llena de imprevistos. Te brindamos un escudo financiero sólido para que vivas con total libertad y tranquilidad.',
        catalog: 'Descubre nuestros planes de protección familiar, seguros médicos internacionales y blindaje corporativo.',
        testimonial: 'Cuando tuvimos la emergencia, respondieron al instante. Sentí un verdadero respaldo humano y profesional.',
        faq1_q: '¿El seguro médico cubre emergencias?',
        faq1_a: 'Sí, contamos con planes de cobertura total al 100% en emergencias sin necesidad de copagos al instante.',
        faq2_q: '¿Puedo asegurar mi negocio?',
        faq2_a: 'Ofrecemos pólizas integrales que protegen su infraestructura, inventario y responsabilidad civil.',
        location: 'Acérquese a nuestra agencia matriz. Lo recibiremos para diseñar juntos su plan de protección a medida.',
        address: 'Edificio Corporativo, Ala Norte'
    }
};

// Generador genérico para nichos que no están explícitamente en el objeto arriba
function getGenericCopy(nicheName) {
    // Humanizar el nombre (ej. "DoctoresEspecialistas" -> "Doctores Especialistas")
    const humanName = nicheName.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    return {
        title: `Excelencia y <span class="sl-glow-text">Compromiso</span>`,
        subtitle: `Experimente un servicio superior diseñado especialmente para satisfacer sus más altas expectativas en el área de ${humanName}.`,
        catalog: `Explore nuestro portafolio de servicios y descubra las soluciones innovadoras que tenemos para usted.`,
        testimonial: `La atención al detalle y el servicio personalizado marcaron la diferencia. Altamente recomendados.`,
        faq1_q: '¿Cómo agendo un servicio?',
        faq1_a: 'Puede contactarnos directamente por WhatsApp o llenar el formulario para recibir atención prioritaria.',
        faq2_q: '¿Brindan asesoría personalizada?',
        faq2_a: 'Por supuesto. Evaluamos cada caso de manera individual para ofrecer soluciones a medida.',
        location: 'Visite nuestras modernas instalaciones, diseñadas pensando en su confort y exclusividad.',
        address: 'Zona Comercial, Edificio Principal'
    };
}

function generateHTML(copy) {
    return `
        <!-- ─── SECCIÓN 03: EXPERIENCIA Y CATÁLOGO ──────────────────── -->
        <section id="experiencia" class="sl-section">
            <div class="sl-container">
                <div class="sl-section-header">
                    <div class="sl-system-tag">VIVE LA EXPERIENCIA</div>
                    <h2>${copy.title}</h2>
                    <p>${copy.subtitle}</p>
                </div>

                <div class="sl-cta-box glass-panel" style="margin-top: 30px;">
                    <h3 style="font-size: 22px; color: var(--sl-gold); margin-bottom: 15px;">Descubre Nuestro Catálogo</h3>
                    <p style="margin-bottom: 25px;">${copy.catalog}</p>
                    <div class="sl-cta-actions">
                        <a href="https://wa.me/593999999999?text=Hola!%20Deseo%20agendar%20una%20cita." target="_blank" class="sl-btn-primary clip-btn">
                            <i class="fas fa-calendar-check"></i><span>Agendar Cita</span>
                        </a>
                        <a href="catalogo.html" class="sl-btn-secondary clip-btn">
                            <i class="fas fa-book-open"></i><span>Ver Catálogo</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── SECCIÓN 04: TESTIMONIOS (PRUEBA SOCIAL) ──────────────────── -->
        <section id="testimonios" class="sl-section" style="background: rgba(255, 255, 255, 0.02); border-top: 1px solid var(--sl-border); border-bottom: 1px solid var(--sl-border);">
            <div class="sl-container">
                <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <i class="fas fa-quote-left" style="font-size: 40px; color: var(--sl-gold); opacity: 0.3; margin-bottom: 20px;"></i>
                    <p style="font-size: 22px; font-style: italic; font-weight: 300; line-height: 1.6;">"${copy.testimonial}"</p>
                    <div style="margin-top: 20px; font-size: 14px; font-weight: bold; letter-spacing: 2px; color: var(--sl-gold);">— CLIENTE SATISFECHO</div>
                </div>
            </div>
        </section>

        <!-- ─── SECCIÓN 05: PREGUNTAS FRECUENTES ────────────────────────── -->
        <section id="faq" class="sl-section">
            <div class="sl-container">
                <div class="sl-section-header">
                    <div class="sl-system-tag">RESOLVEMOS TUS DUDAS</div>
                    <h2>Preguntas <span class="sl-glow-text">Frecuentes</span></h2>
                </div>
                
                <div class="sl-faq-grid" style="display: grid; gap: 15px; max-width: 800px; margin: 0 auto;">
                    <div class="sl-faq-item glass-panel">
                        <div class="sl-faq-header" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 15px;">
                            <h4 style="margin: 0; font-size: 16px;">${copy.faq1_q}</h4>
                            <i class="fas fa-chevron-down" style="color: var(--sl-gold);"></i>
                        </div>
                        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="padding: 0 15px 15px 15px; color: var(--sl-text-dim); margin: 0;">${copy.faq1_a}</p>
                        </div>
                    </div>
                    <div class="sl-faq-item glass-panel">
                        <div class="sl-faq-header" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 15px;">
                            <h4 style="margin: 0; font-size: 16px;">${copy.faq2_q}</h4>
                            <i class="fas fa-chevron-down" style="color: var(--sl-gold);"></i>
                        </div>
                        <div class="faq-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                            <p style="padding: 0 15px 15px 15px; color: var(--sl-text-dim); margin: 0;">${copy.faq2_a}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── SECCIÓN 06: UBICACIÓN Y ESPACIO ────────────────────────── -->
        <section id="ubicacion" class="sl-section" style="padding-bottom: 0;">
            <div class="sl-container" style="position: relative; max-width: 1000px;">
                <div class="glass-panel loc-panel" style="position: absolute; top: 50%; left: 5%; transform: translateY(-50%); z-index: 10; padding: 40px; max-width: 400px; border-left: 4px solid var(--sl-gold); box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                    <h3 style="font-size: 28px; margin-bottom: 15px;">Nuestra <span class="sl-glow-text">Ubicación</span></h3>
                    <p style="color: var(--sl-text-dim); margin-bottom: 20px;">${copy.location}</p>
                    <ul style="list-style: none; padding: 0; margin-bottom: 25px;">
                        <li style="margin-bottom: 15px;"><i class="fas fa-map-marker-alt" style="color: var(--sl-gold); width: 25px;"></i> ${copy.address}</li>
                        <li><i class="fas fa-clock" style="color: var(--sl-gold); width: 25px;"></i> Atención previa cita</li>
                    </ul>
                    <a href="https://wa.me/593999999999" target="_blank" class="sl-btn-primary clip-btn" style="width: 100%; justify-content: center; padding: 12px;">
                        <i class="fab fa-whatsapp"></i><span>Cómo llegar</span>
                    </a>
                </div>
                
                <!-- Mapa Genérico oscuro -->
                <div style="width: 100%; height: 500px; border-radius: 8px; overflow: hidden; opacity: 0.85;">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.8465625785!2d-79.98006845!3d-2.1465261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13c6a46fb33b%3A0x868c2225c52c0022!2sGuayaquil%2C%20Ecuador!5e0!3m2!1ses!2s!4v1716768393521!5m2!1ses!2s" width="100%" height="100%" style="border:0; filter: grayscale(100%) invert(90%) hue-rotate(180deg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            
            <style>
                @media (max-width: 768px) {
                    .loc-panel { position: relative !important; top: 0 !important; left: 0 !important; transform: none !important; width: 100% !important; max-width: 100% !important; margin-bottom: 20px; }
                }
            </style>
        </section>
`;
}

// Actualizar todos los index.html
const dirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'ModelosTarjetas' && dirent.name !== 'img')
    .map(dirent => dirent.name);

let updatedCount = 0;

dirs.forEach(niche => {
    const indexPath = path.join(rootDir, niche, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Buscar la sección que contiene "sl-combos-grid"
        const comboIndex = content.indexOf('sl-combos-grid');
        
        if (comboIndex !== -1 && !content.includes('VIVE LA EXPERIENCIA')) {
            const startSection = content.lastIndexOf('<section', comboIndex);
            const endSection = content.indexOf('</section>', comboIndex);
            
            if (startSection !== -1 && endSection !== -1) {
                let actualStart = startSection;
                // Buscar si hay un comentario justo antes
                const possibleCommentStart = content.lastIndexOf('<!--', startSection);
                if (possibleCommentStart !== -1 && (startSection - possibleCommentStart) < 100) {
                    actualStart = possibleCommentStart;
                }
                
                const sectionToReplace = content.substring(actualStart, endSection + 10);
                
                const copyData = nicheCopy[niche] || getGenericCopy(niche);
                const newHTML = generateHTML(copyData);
                
                content = content.replace(sectionToReplace, newHTML);
                fs.writeFileSync(indexPath, content, 'utf8');
                updatedCount++;
            }
        }
    }
});

console.log(`¡Exito! ${updatedCount} plantillas web actualizadas con la nueva estructura de experiencias.`);

