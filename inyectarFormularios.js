const fs = require('fs');
const path = require('path');

// ── Configuraciones por Nicho ─────────────────────────────────────────────
const CONFIGS = {
    Abogado: {
        titulo: "Consulta Legal Gratuita",
        subtitulo: "Cuéntanos tu caso para orientarte mejor en tu primera consulta.",
        boton: "Agendar Consulta Legal",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true, placeholder: "Tu nombre" },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true, placeholder: "0987654321" },
            { label: "Tipo de caso", tipo: "radio", emoji: "⚖️", opciones: ["Penal", "Civil", "Laboral", "Familiar", "Otro"] },
            { label: "¿Tiene documentos del caso?", tipo: "radio", emoji: "📁", opciones: ["Sí, los tengo", "No aún"] },
            { label: "¿Hay alguna fecha límite urgente?", tipo: "radio", emoji: "⏰", opciones: ["Sí, urgente", "No, puedo esperar"] },
            { label: "Cuéntanos brevemente tu situación", tipo: "textarea", emoji: "📝", placeholder: "Describe el caso en pocas palabras..." }
        ]
    },
    Tecont: {
        titulo: "Agenda tu Consulta Contable",
        subtitulo: "Necesitamos algunos datos para preparar tu asesoría.",
        boton: "Agendar Consulta",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true, placeholder: "Tu nombre" },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true, placeholder: "0987654321" },
            { label: "¿Tienes RUC activo?", tipo: "radio", emoji: "🏢", opciones: ["Sí tengo RUC", "No tengo RUC", "Lo quiero sacar"] },
            { label: "¿Llevas contabilidad actualmente?", tipo: "radio", emoji: "📊", opciones: ["Sí", "No", "Intento hacerlo yo"] },
            { label: "¿Facturaste este mes?", tipo: "radio", emoji: "🧾", opciones: ["Sí", "No", "No sé cómo"] },
            { label: "¿Estás al día con el SRI?", tipo: "radio", emoji: "✅", opciones: ["Sí", "Tengo deudas", "No sé"] },
            { label: "Tu situación actual", tipo: "textarea", emoji: "📝", placeholder: "Cuéntanos qué necesitas..." }
        ]
    },
    OntanedaAuditors: {
        titulo: "Solicita tu Auditoría",
        subtitulo: "Cuéntanos sobre tu empresa para preparar la propuesta.",
        boton: "Solicitar Auditoría",
        preguntas: [
            { label: "Nombre / Empresa", tipo: "text", emoji: "🏢", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de empresa", tipo: "radio", emoji: "🔖", opciones: ["Persona Natural", "Sociedad", "ONG", "Otro"] },
            { label: "¿Cuántos empleados tienen?", tipo: "select", emoji: "👥", opciones: ["1-5", "6-20", "21-50", "Más de 50"] },
            { label: "Tipo de auditoría requerida", tipo: "radio", emoji: "📋", opciones: ["Financiera", "Tributaria", "Interna", "No sé cuál"] },
            { label: "Detalles adicionales", tipo: "textarea", emoji: "📝" }
        ]
    },
    Economista: {
        titulo: "Consulta con el Economista",
        subtitulo: "Compártenos tu situación financiera.",
        boton: "Agendar Consulta",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Eres persona natural o empresa?", tipo: "radio", emoji: "🔖", opciones: ["Persona Natural", "Empresa", "Emprendimiento"] },
            { label: "¿Cuál es tu principal necesidad?", tipo: "radio", emoji: "🎯", opciones: ["Inversión", "Ahorro", "Análisis financiero", "Otro"] },
            { label: "Cuéntanos tu situación", tipo: "textarea", emoji: "📝" }
        ]
    },
    AsesorFinanciero: {
        titulo: "Asesoría Financiera",
        subtitulo: "Cuéntanos tu perfil financiero actual.",
        boton: "Agendar Asesoría",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Tienes ahorros actualmente?", tipo: "radio", emoji: "💰", opciones: ["Sí, quiero invertirlos", "No, quiero empezar", "Tengo deudas"] },
            { label: "Meta principal", tipo: "radio", emoji: "🎯", opciones: ["Inversión", "Jubilación", "Comprar casa", "Otro"] },
            { label: "Tu situación financiera", tipo: "textarea", emoji: "📝" }
        ]
    },
    AgenciaDeSeguros: {
        titulo: "Cotiza tu Seguro",
        subtitulo: "Datos para preparar tu cotización personalizada.",
        boton: "Recibir Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de seguro", tipo: "radio", emoji: "🛡️", opciones: ["Vida", "Vehicular", "Hogar", "Salud", "Empresarial"] },
            { label: "¿Ya tienes algún seguro?", tipo: "radio", emoji: "📋", opciones: ["Sí", "No"] },
            { label: "Detalles adicionales", tipo: "textarea", emoji: "📝", placeholder: "Edad, tipo de vehículo, etc." }
        ]
    },
    Dentista: {
        titulo: "Agenda tu Consulta Dental",
        subtitulo: "Cuéntanos cómo podemos ayudarte.",
        boton: "Agendar Cita Dental",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Motivo de la consulta", tipo: "radio", emoji: "🦷", opciones: ["Limpieza", "Dolor", "Ortodoncia", "Blanqueamiento", "Revisión"] },
            { label: "¿Es primera vez con nosotros?", tipo: "radio", emoji: "🆕", opciones: ["Sí", "No, ya fui antes"] },
            { label: "¿Tienes alergias a medicamentos?", tipo: "radio", emoji: "⚠️", opciones: ["Sí", "No", "No sé"] },
            { label: "Comentario adicional", tipo: "textarea", emoji: "📝" }
        ]
    },
    DoctoresEspecialistas: {
        titulo: "Agenda tu Consulta Médica",
        subtitulo: "Información previa para optimizar tu atención.",
        boton: "Agendar Consulta Médica",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Síntoma principal", tipo: "text", emoji: "🩺", placeholder: "Ej: dolor de cabeza, fiebre..." },
            { label: "¿Desde cuándo?", tipo: "radio", emoji: "📅", opciones: ["Hoy", "Esta semana", "Hace 1 mes", "Hace más tiempo"] },
            { label: "¿Tomas medicamentos actualmente?", tipo: "radio", emoji: "💊", opciones: ["Sí", "No"] },
            { label: "¿Es primera consulta?", tipo: "radio", emoji: "🆕", opciones: ["Sí", "No"] },
            { label: "Descripción de síntomas", tipo: "textarea", emoji: "📝" }
        ]
    },
    PsicologoTerapeuta: {
        titulo: "Primera Sesión de Consulta",
        subtitulo: "Toda la información es estrictamente confidencial.",
        boton: "Agendar Primera Sesión",
        preguntas: [
            { label: "Nombre (puede ser solo tu nombre)", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Motivo de consulta", tipo: "radio", emoji: "💭", opciones: ["Ansiedad", "Depresión", "Relaciones", "Autoestima", "Otro"] },
            { label: "¿Has tenido terapia antes?", tipo: "radio", emoji: "🔄", opciones: ["Sí", "No"] },
            { label: "¿Hay algo urgente que quieras trabajar?", tipo: "textarea", emoji: "📝", placeholder: "Opcional, lo que quieras compartir..." }
        ]
    },
    Nutricionista: {
        titulo: "Plan de Nutrición Personalizado",
        subtitulo: "Cuéntanos tus objetivos para preparar tu plan.",
        boton: "Agendar Consulta",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Objetivo principal", tipo: "radio", emoji: "🎯", opciones: ["Bajar de peso", "Subir de peso", "Músculo", "Salud general"] },
            { label: "¿Sigues alguna dieta actualmente?", tipo: "radio", emoji: "🥗", opciones: ["Sí", "No"] },
            { label: "¿Tienes alguna condición médica?", tipo: "radio", emoji: "⚕️", opciones: ["Diabetes", "Hipertensión", "Ninguna", "Otra"] },
            { label: "Cuéntanos tu situación actual", tipo: "textarea", emoji: "📝" }
        ]
    },
    Quiropractico: {
        titulo: "Consulta Quiropráctica",
        subtitulo: "Cuéntanos sobre tu dolor o molestia.",
        boton: "Agendar Consulta",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Zona de dolor", tipo: "radio", emoji: "🦴", opciones: ["Espalda baja", "Cuello", "Hombros", "Cadera", "Otro"] },
            { label: "¿Desde cuándo tienes el dolor?", tipo: "radio", emoji: "📅", opciones: ["Esta semana", "1 mes", "Varios meses", "Años"] },
            { label: "Intensidad del dolor (1-10)", tipo: "select", emoji: "📊", opciones: ["1-3 (leve)", "4-6 (moderado)", "7-10 (severo)"] },
            { label: "Descripción adicional", tipo: "textarea", emoji: "📝" }
        ]
    },
    EnfermerasCuidados: {
        titulo: "Solicita Cuidado de Enfermería",
        subtitulo: "Cuéntanos las necesidades del paciente.",
        boton: "Solicitar Servicio",
        preguntas: [
            { label: "Nombre del solicitante", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de cuidado", tipo: "radio", emoji: "🏥", opciones: ["Adulto mayor", "Post-operatorio", "Enfermedad crónica", "Otro"] },
            { label: "¿Es cuidado diurno o nocturno?", tipo: "radio", emoji: "🕐", opciones: ["Diurno", "Nocturno", "24 horas"] },
            { label: "Descripción de necesidades", tipo: "textarea", emoji: "📝" }
        ]
    },
    GimnasioEntrenador: {
        titulo: "Plan de Entrenamiento Personalizado",
        subtitulo: "Cuéntanos tu nivel y objetivos.",
        boton: "Agendar Evaluación Gratuita",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Objetivo", tipo: "radio", emoji: "🎯", opciones: ["Bajar peso", "Ganar músculo", "Resistencia", "Salud general"] },
            { label: "Nivel actual", tipo: "radio", emoji: "💪", opciones: ["Principiante", "Intermedio", "Avanzado"] },
            { label: "¿Tienes alguna lesión?", tipo: "radio", emoji: "⚠️", opciones: ["Sí", "No"] },
            { label: "Cuéntanos más sobre tus metas", tipo: "textarea", emoji: "📝" }
        ]
    },
    EstudioYoga: {
        titulo: "Tu Primera Clase de Yoga",
        subtitulo: "Cuéntanos para ubicarte en el grupo ideal.",
        boton: "Agendar Primera Clase",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Has practicado yoga antes?", tipo: "radio", emoji: "🧘", opciones: ["Nunca", "Un poco", "Soy regular"] },
            { label: "Objetivo", tipo: "radio", emoji: "🎯", opciones: ["Relajación", "Flexibilidad", "Meditación", "Tonificación"] },
            { label: "¿Tienes lesiones o limitaciones?", tipo: "textarea", emoji: "📝", placeholder: "Espalda, rodillas, etc." }
        ]
    },
    PeluqueriaSalonBelleza: {
        titulo: "Reserva tu Turno",
        subtitulo: "Cuéntanos qué servicio deseas.",
        boton: "Reservar Turno",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Servicio deseado", tipo: "radio", emoji: "💇", opciones: ["Corte", "Tinte/Color", "Tratamiento", "Peinado", "Manicure"] },
            { label: "¿Es tu primera visita?", tipo: "radio", emoji: "🆕", opciones: ["Sí", "No, ya fui antes"] },
            { label: "¿Tienes alguna alergia a productos?", tipo: "radio", emoji: "⚠️", opciones: ["Sí", "No"] },
            { label: "Comentario o referencia de estilo", tipo: "textarea", emoji: "📝", placeholder: "Describe o menciona el estilo que buscas..." }
        ]
    },
    SpaDermocosmiatra: {
        titulo: "Agenda tu Sesión de Spa",
        subtitulo: "Prepara tu experiencia de relajación.",
        boton: "Agendar Sesión",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Servicio de interés", tipo: "radio", emoji: "🌿", opciones: ["Masajes", "Facial", "Depilación", "Tratamiento corporal"] },
            { label: "¿Tienes piel sensible?", tipo: "radio", emoji: "🌸", opciones: ["Sí", "No"] },
            { label: "¿Primera visita?", tipo: "radio", emoji: "🆕", opciones: ["Sí", "No"] },
            { label: "Comentarios o preferencias", tipo: "textarea", emoji: "📝" }
        ]
    },
    FotografoBodas: {
        titulo: "Consulta de Fotografía",
        subtitulo: "Cuéntanos sobre tu evento especial.",
        boton: "Solicitar Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de evento", tipo: "radio", emoji: "📸", opciones: ["Boda", "XV años", "Cumpleaños", "Corporativo", "Sesión personal"] },
            { label: "Fecha aproximada del evento", tipo: "text", emoji: "📅", placeholder: "Ej: 15 de Agosto 2025" },
            { label: "Número de horas estimadas", tipo: "radio", emoji: "🕐", opciones: ["2-3h", "4-6h", "Todo el día"] },
            { label: "Detalles del evento", tipo: "textarea", emoji: "📝" }
        ]
    },
    OrganizadorEventos: {
        titulo: "Cotiza tu Evento",
        subtitulo: "Cuéntanos los detalles para preparar tu propuesta.",
        boton: "Solicitar Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de evento", tipo: "radio", emoji: "🎉", opciones: ["Boda", "Corporativo", "Cumpleaños", "XV años", "Otro"] },
            { label: "Número de invitados (aprox.)", tipo: "select", emoji: "👥", opciones: ["1-30", "31-100", "101-300", "Más de 300"] },
            { label: "Fecha aproximada", tipo: "text", emoji: "📅", placeholder: "Ej: Diciembre 2025" },
            { label: "Descripción del evento", tipo: "textarea", emoji: "📝" }
        ]
    },
    Restaurante: {
        titulo: "Reserva tu Mesa",
        subtitulo: "Cuéntanos para preparar tu experiencia.",
        boton: "Confirmar Reserva",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Número de personas", tipo: "radio", emoji: "👥", opciones: ["1-2", "3-4", "5-8", "Más de 8"] },
            { label: "¿Es una ocasión especial?", tipo: "radio", emoji: "🎂", opciones: ["Cumpleaños", "Aniversario", "Reunión de trabajo", "Solo comer"] },
            { label: "¿Alguien del grupo es alérgico o vegetariano?", tipo: "radio", emoji: "🥗", opciones: ["Sí", "No"] },
            { label: "Comentario adicional", tipo: "textarea", emoji: "📝" }
        ]
    },
    AgenteInmobiliario: {
        titulo: "Asesoría Inmobiliaria",
        subtitulo: "Cuéntanos qué estás buscando.",
        boton: "Agendar Asesoría",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Quieres comprar o arrendar?", tipo: "radio", emoji: "🏠", opciones: ["Comprar", "Arrendar", "Vender mi propiedad"] },
            { label: "Tipo de inmueble", tipo: "radio", emoji: "🏢", opciones: ["Casa", "Departamento", "Local comercial", "Terreno"] },
            { label: "Presupuesto aproximado", tipo: "select", emoji: "💰", opciones: ["Menos de $50k", "$50k-$100k", "$100k-$200k", "Más de $200k"] },
            { label: "¿En qué sector o ciudad?", tipo: "text", emoji: "📍", placeholder: "Ej: Norte de Quito" }
        ]
    },
    AgenciaViajes: {
        titulo: "Planifica tu Viaje",
        subtitulo: "Cuéntanos el destino de tus sueños.",
        boton: "Solicitar Propuesta de Viaje",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Destino de interés", tipo: "text", emoji: "✈️", placeholder: "Ej: Cancún, Europa, Islas Galápagos" },
            { label: "Número de viajeros", tipo: "radio", emoji: "👥", opciones: ["Solo/Pareja", "Familia (3-4)", "Grupo (+5)"] },
            { label: "Duración estimada", tipo: "radio", emoji: "📅", opciones: ["1 semana", "2 semanas", "1 mes", "Flexible"] },
            { label: "Presupuesto aproximado por persona", tipo: "select", emoji: "💰", opciones: ["Menos de $1000", "$1000-$2500", "$2500-$5000", "Más de $5000"] },
            { label: "¿Qué tipo de experiencia buscas?", tipo: "textarea", emoji: "📝", placeholder: "Aventura, playa, cultura, gastronomía..." }
        ]
    },
    ConsultorEmpresarial: {
        titulo: "Consultoría Empresarial",
        subtitulo: "Cuéntanos sobre tu empresa.",
        boton: "Agendar Sesión",
        preguntas: [
            { label: "Nombre / Empresa", tipo: "text", emoji: "🏢", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Etapa del negocio", tipo: "radio", emoji: "📊", opciones: ["Idea / Inicio", "En operación", "Quiero crecer", "Tengo problemas"] },
            { label: "Área de apoyo necesaria", tipo: "radio", emoji: "🎯", opciones: ["Ventas", "Finanzas", "Marketing", "Procesos", "Recursos Humanos"] },
            { label: "Número de empleados", tipo: "select", emoji: "👥", opciones: ["Solo yo", "2-5", "6-20", "Más de 20"] },
            { label: "Cuéntanos el reto principal", tipo: "textarea", emoji: "📝" }
        ]
    },
    AgenciaMarketing: {
        titulo: "Potencia tu Marketing",
        subtitulo: "Cuéntanos sobre tu marca y objetivos.",
        boton: "Solicitar Diagnóstico Gratuito",
        preguntas: [
            { label: "Nombre / Empresa", tipo: "text", emoji: "🏢", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Tienes presencia digital actualmente?", tipo: "radio", emoji: "📱", opciones: ["Sí, activa", "Sí, pero descuidada", "No tengo"] },
            { label: "Objetivo principal", tipo: "radio", emoji: "🎯", opciones: ["Más clientes", "Reconocimiento", "Ventas online", "Todo"] },
            { label: "Presupuesto mensual para marketing", tipo: "select", emoji: "💰", opciones: ["Menos de $100", "$100-$500", "$500-$1000", "Más de $1000"] },
            { label: "Cuéntanos tu negocio", tipo: "textarea", emoji: "📝" }
        ]
    },
    AcademiaIdiomas: {
        titulo: "Empieza tu Curso de Idiomas",
        subtitulo: "Cuéntanos tu nivel para ubicarte correctamente.",
        boton: "Agendar Evaluación",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Idioma de interés", tipo: "radio", emoji: "🌍", opciones: ["Inglés", "Francés", "Portugués", "Otro"] },
            { label: "Nivel actual", tipo: "radio", emoji: "📊", opciones: ["Cero", "Básico", "Intermedio", "Avanzado"] },
            { label: "Objetivo del aprendizaje", tipo: "radio", emoji: "🎯", opciones: ["Trabajo", "Viaje", "Universidad", "Personal"] },
            { label: "Comentario adicional", tipo: "textarea", emoji: "📝" }
        ]
    },
    EscuelaManejo: {
        titulo: "Matrícula Escuela de Manejo",
        subtitulo: "Cuéntanos para iniciar tu proceso.",
        boton: "Solicitar Información",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Tienes cédula vigente?", tipo: "radio", emoji: "🪪", opciones: ["Sí", "No"] },
            { label: "Tipo de licencia", tipo: "radio", emoji: "🚗", opciones: ["Tipo B (carro)", "Tipo A (moto)", "Otro"] },
            { label: "¿Has manejado antes?", tipo: "radio", emoji: "🛞", opciones: ["Nunca", "Un poco", "Sí pero sin licencia"] },
            { label: "Horario preferido", tipo: "radio", emoji: "🕐", opciones: ["Mañana", "Tarde", "Noche", "Fines de semana"] }
        ]
    },
    MecanicaAutomotriz: {
        titulo: "Agenda tu Revisión",
        subtitulo: "Cuéntanos sobre tu vehículo.",
        boton: "Agendar Servicio",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Marca y modelo del vehículo", tipo: "text", emoji: "🚗", placeholder: "Ej: Toyota Corolla 2019" },
            { label: "Servicio requerido", tipo: "radio", emoji: "🔧", opciones: ["Cambio aceite", "Frenos", "Revisión general", "Motor", "Otro"] },
            { label: "¿Cuándo fue el último servicio?", tipo: "radio", emoji: "📅", opciones: ["Hace 3 meses", "6 meses", "1 año", "No recuerdo"] },
            { label: "Síntoma o problema", tipo: "textarea", emoji: "📝", placeholder: "Ej: hace ruido al frenar..." }
        ]
    },
    TallerMotos: {
        titulo: "Servicio para tu Moto",
        subtitulo: "Cuéntanos qué necesita tu moto.",
        boton: "Agendar Servicio",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Marca y modelo de la moto", tipo: "text", emoji: "🏍️", placeholder: "Ej: Honda CB500 2020" },
            { label: "Servicio requerido", tipo: "radio", emoji: "🔧", opciones: ["Mantenimiento", "Frenos", "Electricidad", "Motor", "Otro"] },
            { label: "Descripción del problema", tipo: "textarea", emoji: "📝" }
        ]
    },
    AiresAcondicionados: {
        titulo: "Servicio de Aire Acondicionado",
        subtitulo: "Cuéntanos qué necesitas.",
        boton: "Solicitar Servicio",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Dirección / Ciudad", tipo: "text", emoji: "📍", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de servicio", tipo: "radio", emoji: "❄️", opciones: ["Instalación", "Mantenimiento", "Reparación", "Recarga de gas"] },
            { label: "Marca del equipo", tipo: "text", emoji: "🔧", placeholder: "Ej: LG, Samsung..." },
            { label: "Descripción del problema", tipo: "textarea", emoji: "📝" }
        ]
    },
    CamarasSeguridad: {
        titulo: "Cotiza tu Sistema de Seguridad",
        subtitulo: "Cuéntanos tu necesidad.",
        boton: "Solicitar Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de instalación", tipo: "radio", emoji: "📹", opciones: ["Hogar", "Negocio", "Empresa grande"] },
            { label: "Número de cámaras aproximado", tipo: "radio", emoji: "🔢", opciones: ["1-4", "5-10", "Más de 10", "No sé"] },
            { label: "¿Necesitas acceso remoto desde el celular?", tipo: "radio", emoji: "📱", opciones: ["Sí", "No"] },
            { label: "Descripción del área", tipo: "textarea", emoji: "📝" }
        ]
    },
    ReparacionCelulares: {
        titulo: "Reparación de Celulares",
        subtitulo: "Cuéntanos el problema de tu equipo.",
        boton: "Solicitar Reparación",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono de contacto", tipo: "tel", emoji: "📞", required: true },
            { label: "Marca y modelo del equipo", tipo: "text", emoji: "📱", placeholder: "Ej: Samsung S21" },
            { label: "Problema del equipo", tipo: "radio", emoji: "🔧", opciones: ["Pantalla rota", "No carga", "No enciende", "Cámara", "Otro"] },
            { label: "Descripción del problema", tipo: "textarea", emoji: "📝" }
        ]
    },
    TecnicoComputadoras: {
        titulo: "Soporte Técnico",
        subtitulo: "Cuéntanos el problema de tu equipo.",
        boton: "Solicitar Asistencia",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de equipo", tipo: "radio", emoji: "💻", opciones: ["Laptop", "PC escritorio", "Impresora", "Otro"] },
            { label: "Problema", tipo: "radio", emoji: "⚠️", opciones: ["Lento", "No enciende", "Virus", "Software", "Hardware"] },
            { label: "Descripción del problema", tipo: "textarea", emoji: "📝" }
        ]
    },
    Carpintero: {
        titulo: "Cotiza tu Proyecto de Madera",
        subtitulo: "Cuéntanos qué necesitas.",
        boton: "Solicitar Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de trabajo", tipo: "radio", emoji: "🪵", opciones: ["Muebles", "Puertas/Ventanas", "Closets", "Reparación", "Otro"] },
            { label: "Material preferido", tipo: "radio", emoji: "🌲", opciones: ["Madera natural", "MDF/Melamínico", "No sé"] },
            { label: "Medidas o descripción", tipo: "textarea", emoji: "📝", placeholder: "Dimensiones o descripción del proyecto..." }
        ]
    },
    LimpiezaHogar: {
        titulo: "Servicio de Limpieza",
        subtitulo: "Cuéntanos qué necesitas limpiar.",
        boton: "Solicitar Servicio",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Dirección", tipo: "text", emoji: "📍", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de espacio", tipo: "radio", emoji: "🏠", opciones: ["Casa", "Departamento", "Oficina", "Local comercial"] },
            { label: "Metros cuadrados aproximados", tipo: "radio", emoji: "📐", opciones: ["Menos de 50m²", "50-100m²", "100-200m²", "Más de 200m²"] },
            { label: "Frecuencia deseada", tipo: "radio", emoji: "📅", opciones: ["Una vez", "Semanal", "Quincenal", "Mensual"] }
        ]
    },
    Nineras: {
        titulo: "Solicita una Niñera",
        subtitulo: "Cuéntanos sobre el cuidado que necesitas.",
        boton: "Solicitar Cuidado",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Edad del niño/niños", tipo: "text", emoji: "👶", placeholder: "Ej: 2 años, 5 años" },
            { label: "Horario requerido", tipo: "radio", emoji: "🕐", opciones: ["Mañana", "Tarde", "Noche", "Tiempo completo"] },
            { label: "¿Es trabajo fijo o eventual?", tipo: "radio", emoji: "📅", opciones: ["Fijo", "Eventual"] },
            { label: "Necesidades especiales del niño", tipo: "textarea", emoji: "📝", placeholder: "Alergias, medicamentos, etc." }
        ]
    },
    Veterinaria: {
        titulo: "Consulta Veterinaria",
        subtitulo: "Cuéntanos sobre tu mascota.",
        boton: "Agendar Consulta",
        preguntas: [
            { label: "Tu nombre", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Nombre de tu mascota", tipo: "text", emoji: "🐾", placeholder: "Ej: Max" },
            { label: "Tipo de mascota", tipo: "radio", emoji: "🐶", opciones: ["Perro", "Gato", "Ave", "Otro"] },
            { label: "Motivo de la consulta", tipo: "radio", emoji: "🩺", opciones: ["Vacuna", "Enfermedad", "Revisión general", "Grooming"] },
            { label: "¿Está vacunado?", tipo: "radio", emoji: "💉", opciones: ["Sí", "No", "No sé"] },
            { label: "Descripción del problema", tipo: "textarea", emoji: "📝" }
        ]
    },
    DanielaBohorquezArquitecta: {
        titulo: "Consulta de Arquitectura",
        subtitulo: "Cuéntanos sobre tu proyecto.",
        boton: "Solicitar Consulta",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de proyecto", tipo: "radio", emoji: "🏗️", opciones: ["Casa nueva", "Remodelación", "Local comercial", "Planos", "Otro"] },
            { label: "Metros cuadrados aproximados", tipo: "text", emoji: "📐", placeholder: "Ej: 150m²" },
            { label: "Presupuesto estimado", tipo: "select", emoji: "💰", opciones: ["Menos de $10k", "$10k-$30k", "$30k-$100k", "Más de $100k"] },
            { label: "Descripción del proyecto", tipo: "textarea", emoji: "📝" }
        ]
    },
    Influencer: {
        titulo: "Colaboraciones y Contenido",
        subtitulo: "Cuéntanos tu propuesta.",
        boton: "Enviar Propuesta",
        preguntas: [
            { label: "Nombre / Empresa", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono / Email", tipo: "text", emoji: "📞", required: true },
            { label: "Tipo de colaboración", tipo: "radio", emoji: "🤝", opciones: ["Publicidad paga", "Canje", "Embajador de marca", "Contenido conjunto"] },
            { label: "Presupuesto de colaboración", tipo: "select", emoji: "💰", opciones: ["Menos de $100", "$100-$500", "$500-$2000", "Más de $2000"] },
            { label: "Detalles de la propuesta", tipo: "textarea", emoji: "📝" }
        ]
    },
    AutoraSordociega: {
        titulo: "Contacto y Consultas",
        subtitulo: "Cuéntanos cómo podemos ayudarte.",
        boton: "Enviar Mensaje",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Motivo de contacto", tipo: "radio", emoji: "📝", opciones: ["Charla / Conferencia", "Libro / Publicación", "Entrevista", "Otro"] },
            { label: "Tu mensaje", tipo: "textarea", emoji: "💬" }
        ]
    },
    FrigorificoBuffet: {
        titulo: "Reserva tu Buffet",
        subtitulo: "Cuéntanos los detalles del evento.",
        boton: "Solicitar Cotización",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "Tipo de evento", tipo: "radio", emoji: "🎉", opciones: ["Boda", "Corporativo", "Cumpleaños", "Graduación", "Otro"] },
            { label: "Número de personas", tipo: "select", emoji: "👥", opciones: ["Menos de 30", "30-100", "100-300", "Más de 300"] },
            { label: "Fecha del evento", tipo: "text", emoji: "📅", placeholder: "Ej: 20 de Julio 2025" },
            { label: "Comentarios", tipo: "textarea", emoji: "📝" }
        ]
    },
    DELIFROZEN: {
        titulo: "Haz tu Pedido",
        subtitulo: "Cuéntanos qué deseas ordenar.",
        boton: "Enviar Pedido",
        preguntas: [
            { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
            { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
            { label: "¿Entrega a domicilio o recoges?", tipo: "radio", emoji: "🚚", opciones: ["A domicilio", "Recojo yo"] },
            { label: "Dirección (si es a domicilio)", tipo: "text", emoji: "📍", placeholder: "Tu dirección..." },
            { label: "Productos de interés", tipo: "textarea", emoji: "🛒", placeholder: "Lista lo que quieres pedir..." }
        ]
    }
};

// Nichos sin configuración específica: usar template genérico
const GENERIC = {
    titulo: "Agenda tu Consulta",
    subtitulo: "Cuéntanos sobre tu necesidad.",
    boton: "Agendar Cita",
    preguntas: [
        { label: "Nombre completo", tipo: "text", emoji: "👤", required: true },
        { label: "Teléfono", tipo: "tel", emoji: "📞", required: true },
        { label: "¿En qué podemos ayudarte?", tipo: "radio", emoji: "🎯", opciones: ["Consulta inicial", "Cotización", "Información general"] },
        { label: "Cuéntanos tu situación", tipo: "textarea", emoji: "📝" }
    ]
};

// ── Inyectar en cada plantilla ─────────────────────────────────────────────
const rootDir = 'd:/NEXUSDIGITAL';
const dirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'ModelosTarjetas' && d.name !== 'img')
    .map(d => d.name);

let count = 0;

dirs.forEach(niche => {
    const cfg = CONFIGS[niche] || { ...GENERIC };
    cfg.negocio = niche;

    const configScript = `
    <!-- NEXUS FORM CONFIG: ${niche} -->
    <script>
    window.NEXUS_FORM_CONFIG = ${JSON.stringify(cfg, null, 4)};
    window.NEXUS_FORM_CONFIG.whatsapp = "593000000000"; // Placeholder: NexusBuilder reemplazará esto
    window.NEXUS_FORM_CONFIG.calendly = ""; // Placeholder: NexusBuilder reemplazará esto
    window.NEXUS_FORM_CONFIG.webhook = ""; // Placeholder: Make.com webhook del cliente
    </script>
    <script src="../formulario.js"></script>
</body>`;

    const indexPath = `${rootDir}/${niche}/index.html`;
    if (!fs.existsSync(indexPath)) return;

    let html = fs.readFileSync(indexPath, 'utf8');

    // Evitar duplicados
    if (html.includes('NEXUS FORM CONFIG')) return;

    // Reemplazar el script del simulador cierre de body
    html = html.replace('    <script src="../simulador.js"></script>\n</body>', 
        `    <script src="../simulador.js"></script>\n${configScript}`);

    // Si no hay simulador, simplemente poner antes de </body>
    if (!html.includes('NEXUS FORM CONFIG')) {
        html = html.replace('</body>', `${configScript}`);
    }

    fs.writeFileSync(indexPath, html, 'utf8');
    count++;
});

console.log(`✅ Formularios de pre-cita configurados en ${count} plantillas.`);


