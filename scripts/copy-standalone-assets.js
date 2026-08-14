// Next.js dengan output: "standalone" TIDAK otomatis menyalin folder
// public/ dan .next/static/ ke dalam .next/standalone/ — ini harus
// dilakukan manual sebagai bagian dari proses build.
// Referensi: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
//
// Script ini jalan otomatis lewat "postbuild" di package.json, jadi
// setiap kali `npm run build` selesai, file-file ini otomatis ke-copy.

const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");

function copyIfExists(source, destination) {
  if (!fs.existsSync(source)) {
    console.warn(`[postbuild] Lewati, tidak ditemukan: ${source}`);
    return;
  }
  fs.cpSync(source, destination, { recursive: true });
  console.log(`[postbuild] Berhasil disalin: ${source} -> ${destination}`);
}

if (!fs.existsSync(standaloneDir)) {
  console.warn(
    '[postbuild] Folder .next/standalone tidak ditemukan. ' +
      'Pastikan output: "standalone" sudah diset di next.config.js.'
  );
  process.exit(0);
}

// Pastikan pdf.worker.min.mjs ada di folder public/
const workerSource = path.join(rootDir, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const workerDest = path.join(rootDir, "public", "pdf.worker.min.mjs");
if (fs.existsSync(workerSource) && !fs.existsSync(workerDest)) {
  fs.copyFileSync(workerSource, workerDest);
  console.log("[postbuild] Berhasil menyalin pdf.worker.min.mjs ke folder public/");
}

copyIfExists(
  path.join(rootDir, "public"),
  path.join(standaloneDir, "public")
);

copyIfExists(
  path.join(rootDir, ".next", "static"),
  path.join(standaloneDir, ".next", "static")
);

console.log("[postbuild] Selesai menyalin asset untuk standalone build.");