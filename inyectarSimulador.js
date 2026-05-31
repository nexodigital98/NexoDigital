const fs = require('fs');
const path = require('path');

const rootDir = 'd:/NEXUSDIGITAL';

const dirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'ModelosTarjetas' && dirent.name !== 'img')
    .map(dirent => dirent.name);

let updatedCount = 0;

dirs.forEach(niche => {
    const indexPath = path.join(rootDir, niche, 'index.html');
    if (fs.existsSync(indexPath)) {
        let htmlContent = fs.readFileSync(indexPath, 'utf8');
        
        // Evitar duplicados
        if (!htmlContent.includes('<script src="../simulador.js"></script>')) {
            htmlContent = htmlContent.replace('</body>', '    <script src="../simulador.js"></script>\n</body>');
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            updatedCount++;
        }
    }
});

console.log(`Script del simulador inyectado exitosamente en ${updatedCount} plantillas.`);

