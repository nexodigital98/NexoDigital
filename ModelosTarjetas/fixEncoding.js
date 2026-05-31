const fs = require('fs');

let content = fs.readFileSync('buildCards.js', 'utf8');

// Fix text encoding for the array items
const replacements = [
    { from: /DiseÃ±o/g, to: 'Diseño' },
    { from: /prÃ³xima/g, to: 'próxima' },
    { from: /PrecisiÃ³n/g, to: 'Precisión' },
    { from: /SuÃ¡rez/g, to: 'Suárez' },
    { from: /InspiraciÃ³n/g, to: 'Inspiración' },
    { from: /lÃ­mites/g, to: 'límites' },
    { from: /TecnologÃ­a/g, to: 'Tecnología' },
    { from: /FrigorÃ­fico/g, to: 'Frigorífico' },
    { from: /MecÃ¡nica/g, to: 'Mecánica' },
    { from: /PasiÃ³n/g, to: 'Pasión' },
    { from: /dÃ­a/g, to: 'día' },
    { from: /AnÃ¡lisis/g, to: 'Análisis' },
    { from: /visiÃ³n/g, to: 'visión' },
    { from: /corazÃ³n/g, to: 'corazón' }
];

for (let r of replacements) {
    content = content.replace(r.from, r.to);
}

// Ensure the image display logic is safe, and standardise .fut-content with a backdrop
// We only want to do this cleanly without breaking the logic.
// The easiest way is to modify the getInfoLayout function body in the text.

const getInfoLayoutRegex = /function getInfoLayout\(niche\) \{[\s\S]*?return `([\s\S]*?)`;\s*\}/;

const newGetInfoLayout = `function getInfoLayout(niche) {
    return \`
    <div class="fut-top-right">
        <img src="../../\${niche.folder}/img/logos/NEXUS%20DIGITAL.png" alt="Logo">
    </div>
    <div class="fut-team-zone">
        <img src="../../\${niche.folder}/img/hero/EQUIPO.png" alt="Equipo" onerror="this.style.display='none'">
    </div>
    <div class="fut-content" style="background: rgba(10,10,12,0.8); padding: 15px 20px; border-radius: 12px; width: 88%; margin: 0 auto 20px auto; align-self: center; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h2 class="fut-title" style="color: \${niche.color}; text-align: center; margin: 0 0 5px 0;">\${niche.name}</h2>
        <p class="fut-slogan" style="text-align: center; margin: 0 0 10px 0; color: #ccc;">\${niche.slogan}</p>
        <div class="fut-divider" style="background: \${niche.color}; width: 80%; height: 1px; margin: 0 auto 15px auto;"></div>
        <div class="fut-socials" style="display: flex; justify-content: center; gap: 10px; width: 100%;">
            <div class="soc-circle" style="color: \${niche.color}; border-color: \${niche.color};">\${iconWA}</div>
            <div class="soc-circle" style="color: \${niche.color}; border-color: \${niche.color};">\${iconIG}</div>
            <div class="soc-circle" style="color: \${niche.color}; border-color: \${niche.color};">\${iconTT}</div>
            <div class="soc-circle" style="color: \${niche.color}; border-color: \${niche.color};">\${iconIN}</div>
        </div>
        <button class="fut-btn" onclick="openAndRedirect(event)" style="background: linear-gradient(180deg, \${niche.color} 0%, #111 200%); color: #000; border: 1px solid \${niche.color}; width: 90%; padding: 12px; margin: 15px auto 5px auto; display: flex; justify-content: center; align-items: center; border-radius: 4px; font-weight: bold; text-transform: uppercase;">
            MÁS INFORMACIÓN &rsaquo;
        </button>
    </div>\`;
}`;

content = content.replace(getInfoLayoutRegex, newGetInfoLayout);

fs.writeFileSync('buildCards.js', content, 'utf8');
console.log('Fixed encoding and unified getInfoLayout layout successfully.');

