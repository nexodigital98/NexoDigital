const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("=========================================");
console.log("    NEXUS BUILDER - GENERADOR AUTOMATICO  ");
console.log("=========================================\n");

rl.question("Pega el Codigo Nexus que te envio el cliente: ", (code) => {
    rl.close();

    if (!code || !code.trim().startsWith("NEXUS-")) {
        console.log("ERROR: Codigo invalido. Debe empezar con NEXUS-");
        process.exit(1);
    }

    let config;
    try {
        const base64str = code.trim().replace("NEXUS-", "");
        const jsonStr = Buffer.from(base64str, 'base64').toString('utf8');
        config = JSON.parse(jsonStr);
    } catch (e) {
        console.log("ERROR al decodificar: " + e.message);
        process.exit(1);
    }

    console.log("\nCodigo decodificado correctamente:");
    console.log("- Cliente  : " + config.n);
    console.log("- Slogan   : " + config.s);
    console.log("- Color    : " + config.c);
    console.log("- WhatsApp : " + (config.w || "No especificado"));
    console.log("- Calendly : " + (config.cal || "No especificado"));
    console.log("- Plantilla: " + config.t);

    const rootDir = __dirname;
    const sourceDir = path.join(rootDir, config.t);

    if (!fs.existsSync(sourceDir)) {
        console.log(`ERROR: La plantilla '${config.t}' no existe en la carpeta.`);
        process.exit(1);
    }

    // Sanitize folder name: remove accents, keep only alphanumeric
    const sanitize = str => str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "_")
        .toUpperCase();

    const folderName = "CLIENTE_" + sanitize(config.n);
    const destDir = path.join(rootDir, folderName);

    // Remove existing folder if it exists (re-generation)
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true });
        console.log(`\nCarpeta existente reemplazada.`);
    }

    console.log(`\nGenerando sitio web en carpeta: /${folderName}...`);
    fs.cpSync(sourceDir, destDir, { recursive: true });

    // Read and patch index.html
    const indexPath = path.join(destDir, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    // 1. Inject business name into card title
    html = html.replace(
        /<div class="fut-name-banner">\s*<h2>.*?<\/h2>/s,
        `<div class="fut-name-banner">\n                                    <h2>${config.n}</h2>`
    );

    // 2. Inject slogan
    html = html.replace(
        /<p class="card-slogan">.*?<\/p>/,
        `<p class="card-slogan">${config.s}</p>`
    );

    // 3. Inject custom color CSS permanently BEFORE </head>
    const colorBlock = `
    <!-- COLORES PERSONALIZADOS: ${config.n} -->
    <style>
        :root {
            --sl-gold: ${config.c} !important;
            --sl-cyan: ${config.c} !important;
        }
        .sl-glow-text, .sl-system-tag { color: ${config.c} !important; }
        .sl-btn-primary, .sl-btn-card, .sl-btn-combo { background: ${config.c} !important; border-color: ${config.c} !important; }
        .card-corner { border-color: ${config.c} !important; }
        .sl-skill-fill { background: ${config.c} !important; }
    </style>
</head>`;
    html = html.replace('</head>', colorBlock);

    // 4. Inyectar configuracion del formulario (WhatsApp y Calendly)
    if (config.w) {
        html = html.replace(/window\.NEXUS_FORM_CONFIG\.whatsapp\s*=\s*".*?";/g, `window.NEXUS_FORM_CONFIG.whatsapp = "${config.w}";`);
    }
    if (config.cal) {
        html = html.replace(/window\.NEXUS_FORM_CONFIG\.calendly\s*=\s*".*?";/g, `window.NEXUS_FORM_CONFIG.calendly = "${config.cal}";`);
    }

    // 5. Remove simulator from final client build
    html = html.replace(/\s*<script src="\.\.\/simulador\.js"><\/script>/g, '');

    fs.writeFileSync(indexPath, html, 'utf8');

    console.log("\n========================================");
    console.log("  SITIO CREADO CON EXITO!");
    console.log("========================================");
    console.log(`Carpeta: ${folderName}`);
    console.log(`\nPasos finales:`);
    console.log(`1. Ve a la carpeta: ${folderName}\\img\\logos`);
    console.log(`2. Reemplaza el logo con el que te mando el cliente por WhatsApp.`);
    console.log(`3. Sube toda la carpeta al servidor.`);
    console.log(`\nListo! En menos de 1 minuto la web esta lista.\n`);
});


