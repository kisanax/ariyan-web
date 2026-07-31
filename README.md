# PT Ariyan Medika Utama — Website Company Profile

Starter project Next.js + Tailwind CSS, sudah termasuk struktur untuk
integrasi Sanity CMS.

## Yang sudah jadi

- Homepage (hero, trust strip, produk unggulan, sertifikasi)
- Halaman `/produk` dengan filter kategori/brand, search (debounced), sort — semua tersimpan di URL
- Halaman detail produk `/produk/[slug]` dengan tombol "Minta Penawaran via WhatsApp"
- Animasi scroll-reveal ringan (Framer Motion, cuma pakai opacity + transform)
- Warna brand diambil dari gradient logo (biru → teal), lihat `tailwind.config.ts`
- Schema Sanity untuk Produk, Kategori, Brand, Principal (`/sanity/schemaTypes`)
- Data produk masih **dummy** di `lib/products.ts` — nanti diganti query Sanity

## Cara jalanin di laptop kamu

1. Install [Node.js](https://nodejs.org) versi 20 ke atas kalau belum ada.
2. Buka folder ini di terminal, lalu jalankan:
   ```
   npm install
   npm run dev
   ```
3. Buka `http://localhost:3000` di browser.

## Setup Sanity CMS (langkah berikutnya)

1. Daftar gratis di [sanity.io](https://sanity.io), buat project baru.
2. Copy **Project ID** yang didapat, lalu ganti `"YOUR_PROJECT_ID"` di file `sanity.config.ts`.
3. Buat file `.env.local` di root project, isi:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=isi_project_id_kamu
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Jalankan `npm run dev`, lalu buka `http://localhost:3000/studio` untuk akses Sanity Studio (dashboard admin buat input produk).
5. Setelah mulai input data di Studio, kita ganti `lib/products.ts` dengan query GROQ ke Sanity — bagian ini kita kerjain bareng di sesi berikutnya.

## Deploy ke Hostinger

Project sudah diset `output: "standalone"` di `next.config.js` supaya lebih ringan
buat deploy ke Hostinger Business plan (Web Apps Hosting):

1. Push project ini ke repository GitHub.
2. Di hPanel Hostinger, pilih **Deploy Aplikasi Web** → hubungkan ke repo GitHub kamu.
3. Hostinger akan otomatis build & deploy tiap kali ada push baru ke branch utama.

## Struktur folder penting

```
app/                  → halaman-halaman (App Router)
  page.tsx             → homepage
  produk/page.tsx       → listing produk + filter
  produk/[slug]/page.tsx → detail produk
components/           → komponen reusable (Header, Footer, ProductCard, dll)
lib/products.ts       → data produk (sementara dummy)
sanity/schemaTypes/   → definisi struktur data CMS
```

## Yang masih perlu dikerjain (belum di scope starter ini)

- Halaman About, Services, Contact (masih placeholder folder kosong)
- Koneksi beneran ke Sanity (masih dummy data)
- Fitur "Compare Product" dari customer journey blueprint
- Halaman "Downloads" (katalog PDF, sertifikat)
- Logo asli PT Ariyan Medika Utama (belum dipasang, masih teks)
- Foto produk asli (masih placeholder abu-abu)
