const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Admin/.gemini/antigravity-ide/brain/0295057e-5968-4057-bd14-5156fc43cc51';
const dstDir = 'd:/Project/sterin/BLUEPRINT/ariyan-web/web/public/images';

const files = [
  ['service_maintenance_v2_1786002841455.png', 'service-maintenance.png'],
  ['service_kalibrasi_v2_1786002864637.png', 'service-kalibrasi.png'],
  ['service_perbaikan_v2_1786002883425.png', 'service-perbaikan.png'],
  ['service_instalasi_v2_1786002916745.png', 'service-instalasi.png'],
];

files.forEach(([src, dst]) => {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  fs.copyFileSync(srcPath, dstPath);
  console.log(`Copied: ${dst}`);
});
