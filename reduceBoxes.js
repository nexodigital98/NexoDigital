const fs = require('fs');
const path = require('path');

const rootDir = 'd:/NEXUSDIGITAL';

const dirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'ModelosTarjetas' && dirent.name !== 'img')
    .map(dirent => dirent.name);

let styleUpdatedCount = 0;
let indexUpdatedCount = 0;

dirs.forEach(niche => {
    // 1. Update style.css
    const stylePath = path.join(rootDir, niche, 'style.css');
    if (fs.existsSync(stylePath)) {
        let cssContent = fs.readFileSync(stylePath, 'utf8');
        
        // Reducir márgenes y paddings globales
        cssContent = cssContent.replace(/\.sl-section\s*{\s*padding:\s*110px\s*0;\s*}/g, '.sl-section { padding: 60px 0; }');
        cssContent = cssContent.replace(/\.sl-section-header\s*{\s*text-align:\s*center;\s*margin-bottom:\s*70px;\s*}/g, '.sl-section-header { text-align: center; margin-bottom: 35px; }');
        
        // Reducir padding de las tarjetas de servicio y habilidades
        cssContent = cssContent.replace(/padding:\s*45px\s*35px;/g, 'padding: 25px 20px;');
        cssContent = cssContent.replace(/padding:\s*45px\s*30px;/g, 'padding: 25px 20px;');
        
        // Reducir padding de la caja principal CTA
        cssContent = cssContent.replace(/padding:\s*80px\s*60px;/g, 'padding: 35px 30px;'); // Desktop
        cssContent = cssContent.replace(/padding:\s*50px\s*30px;/g, 'padding: 25px 20px;'); // Mobile
        
        fs.writeFileSync(stylePath, cssContent, 'utf8');
        styleUpdatedCount++;
    }

    // 2. Update index.html inline paddings (Location panel & other injected stuff)
    const indexPath = path.join(rootDir, niche, 'index.html');
    if (fs.existsSync(indexPath)) {
        let htmlContent = fs.readFileSync(indexPath, 'utf8');
        
        // Reducir el panel de cristal de la ubicación
        if (htmlContent.includes('padding: 40px; max-width: 400px;')) {
            htmlContent = htmlContent.replace('padding: 40px; max-width: 400px;', 'padding: 25px; max-width: 350px;');
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            indexUpdatedCount++;
        }
    }
});

console.log(`¡Exito! Se han reducido los tamaños de los recuadros en ${styleUpdatedCount} archivos CSS y ${indexUpdatedCount} archivos HTML.`);

