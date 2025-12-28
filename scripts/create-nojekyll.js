const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const nojekyllFile = path.join(outDir, '.nojekyll');

// Create out directory if it doesn't exist
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Create .nojekyll file
fs.writeFileSync(nojekyllFile, '');

console.log('Created .nojekyll file for GitHub Pages');

