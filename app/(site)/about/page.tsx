import Image from "next/image";
import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import OurJourneySlider from "@/components/OurJourneySlider";
import ScrollToAnchor from "@/components/ScrollToAnchor";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  Quote,
  Clock,
  PackageCheck,
  TrendingUp,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export const metadata = {
  title: "Tentang Kami | PT Ariyan Medika Utama",
  description:
    "Profil PT Ariyan Medika Utama, distributor alat kesehatan dan laboratorium terpercaya berstandar CDAKB Kemenkes RI yang dipimpin oleh Andriyanto Prabowo.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafd] min-h-screen pb-20">
      <ScrollToAnchor />
      {/* ─── 1. HERO BANNER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-teal py-20 sm:py-28 text-white">
        {/* Background Ornaments */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/[0.07] blur-2xl" />
          <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-white/[0.05] blur-2xl" />
          <div
            className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Tentang PT Ariyan Medika Utama
          </p>

          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Membangun Kepercayaan, Mendistribusikan{" "}
            <span className="text-brand-light">Solusi Kesehatan Berkualitas</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85">
            Mitra strategis terpercaya fasilitas pelayanan kesehatan di seluruh Indonesia dengan jaminan mutu standar CDAKB Kemenkes RI dan komitmen pelayanan sepenuh hati.
          </p>
        </div>
      </section>

      {/* ─── 2. EXECUTIVE SPOTLIGHT: CEO & FOUNDER (Andriyanto Prabowo) ─── */}
      <RevealSection className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-brand/10">
          {/* Top subtle gradient bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-brand-teal to-brand" />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Foto CEO */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border-4 border-slate-50 bg-slate-100 group">
                <Image
                  src="/images/ceo-andriyanto.jpeg"
                  alt="Andriyanto Prabowo - CEO & Founder PT Ariyan Medika Utama"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge di atas foto */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Founder &amp; CEO
                  </span>
                  <h4 className="mt-1 text-lg font-bold">Andriyanto Prabowo</h4>
                  <p className="text-xs text-white/80">PT Ariyan Medika Utama</p>
                </div>
              </div>
            </div>

            {/* Profil & Pesan CEO */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand w-fit mb-3">
                <Sparkles size={14} className="w-3.5 h-3.5 shrink-0" />
                Executive Leadership
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-900 leading-tight">
                Dedikasi untuk Kemajuan Dunia Kesehatan Indonesia
              </h2>

              {/* Quote Card */}
              <div className="relative mt-6 rounded-2xl border border-brand/15 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-7 shadow-xs">
                <Quote size={32} className="w-8 h-8 shrink-0 text-brand/25 absolute right-4 top-4" />
                <p className="relative z-10 text-sm sm:text-base italic leading-relaxed text-ink-700">
                  &ldquo;Bagi kami, pertumbuhan bukan sekadar diukur dari angka omzet, melainkan dari kepercayaan yang diberikan pelanggan, kualitas pelayanan yang konsisten, dan kesempatan untuk bertumbuh bersama seluruh tim demi kemajuan dunia kesehatan Indonesia.&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-brand/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-ink-900">Andriyanto Prabowo</p>
                    <p className="text-xs text-brand font-medium">Founder &amp; Chief Executive Officer</p>
                  </div>
                  <span className="text-[11px] font-semibold text-ink-500 bg-white px-3 py-1 rounded-full border border-ink-100 shadow-xs">
                    Est. 2024
                  </span>
                </div>
              </div>

              {/* Poin Keunggulan Kepemimpinan */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-ink-700">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-50/80 border border-ink-100">
                  <ShieldCheck size={18} className="w-4.5 h-4.5 shrink-0 text-brand" />
                  <span>Sertifikasi Resmi CDAKB &amp; IDAK Kemenkes</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-50/80 border border-ink-100">
                  <HeartHandshake size={18} className="w-4.5 h-4.5 shrink-0 text-brand-teal" />
                  <span>Pelayanan Berintegritas &amp; Sepenuh Hati</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild className="rounded-full px-7 h-12 bg-gradient-to-r from-brand to-brand-teal text-white font-semibold shadow-md shadow-brand/20 hover:shadow-lg transition-all border-0">
                  <a
                    href="https://wa.me/6285719906608?text=Halo%20Pak%20Andriyanto%2C%20saya%20tertarik%20bermitra%20dengan%20PT%20Ariyan%20Medika%20Utama"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6 h-12 border-ink-200 text-ink-700 hover:bg-ink-50">
                  <Link href="/contact">Informasi Kontak Kantor →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── 3. OUR JOURNEY (Interactive Timeline Slider) ─── */}
      <div className="mt-20">
        <OurJourneySlider />
      </div>

      {/* ─── 4. VISI, MISI & NILAI PERUSAHAAN ─── */}
      <RevealSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand mb-3">
            <Award size={14} className="w-3.5 h-3.5 shrink-0" />
            Fondasi &amp; Komitmen
          </div>
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl tracking-tight">
            Visi, Misi &amp; Standar Mutu Distribusi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-500">
            Nilai-nilai fundamental yang memandu setiap langkah operasional dan pengiriman kami kepada seluruh fasilitas kesehatan.
          </p>
        </div>

        {/* Visi, Tagline & Founder Showcase */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Kolom Kiri: Foto Direktur / Founder dengan komitmen kepemimpinan */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl border border-ink-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Foto Area: 100% jelas & tidak tertutup teks di mobile maupun desktop */}
            <div className="relative aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4.2] w-full overflow-hidden rounded-2xl bg-sky-50">
              <Image
                src="/images/direktur stand raise hand-1.jpeg"
                alt="Andriyanto Prabowo - CEO & Founder PT Ariyan Medika Utama"
                fill
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Info & Kutipan Kepemimpinan di Bawah Foto */}
            <div className="mt-4 px-2 pb-1">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand">
                  Komitmen Kepemimpinan
                </span>
                <span className="text-[10px] font-bold text-ink-400">
                  Founder &amp; CEO
                </span>
              </div>
              <h4 className="text-base font-bold text-ink-900 leading-snug">
                Andriyanto Prabowo
              </h4>
              <p className="mt-2 text-xs text-ink-600 leading-relaxed italic bg-ink-50/70 p-3 rounded-xl border border-ink-100/60">
                &ldquo;Pelayanan tulus dari hati dan integritas adalah janji utama kami kepada seluruh mitra fasilitas kesehatan di Indonesia.&rdquo;
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Visi & Tagline */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Card Visi */}
            <div className="flex-1 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-white p-7 sm:p-8 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-extrabold tracking-widest text-brand uppercase">Visi Perusahaan</span>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-ink-900 leading-snug">
                Menjadi Perusahaan Distribusi Berintegritas Dengan Pelayanan Berkualitas
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
                Mewujudkan ekosistem distribusi alat kesehatan dan laboratorium yang terpercaya, akuntabel, dan memberikan dampak nyata bagi peningkatan mutu layanan medis di Indonesia.
              </p>
            </div>

            {/* Card Tagline & Value */}
            <div className="flex-1 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-white p-7 sm:p-8 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">Tagline &amp; Core Values</span>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-ink-900 leading-snug">
                &ldquo;Service From Heart&rdquo; &amp; Inovasi Tiada Henti
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
                Memberikan pelayanan tulus dari hati untuk setiap pelanggan, didukung oleh semangat inovasi berkelanjutan dan adaptasi terhadap kebutuhan industri kesehatan modern.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Standar Emas Misi (Tepat Barang, Tepat Kualitas, Tepat Waktu) */}
        <div className="mt-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-ink-400 mb-6">
            Misi Utama — Tiga Standar Emas Pengiriman
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* 1. Tepat Barang */}
            <div className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                <PackageCheck size={24} className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="text-lg font-bold text-ink-900">1. Tepat Barang</h4>
              <p className="mt-2 text-xs sm:text-sm text-ink-500 leading-relaxed">
                Menjamin setiap unit alkes, reagen, dan BMHP yang dikirim 100% presisi sesuai spesifikasi teknis dan kebutuhan fasilitas kesehatan.
              </p>
            </div>

            {/* 2. Tepat Kualitas */}
            <div className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-teal/30 hover:shadow-lg hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal mb-4 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                <ShieldCheck size={24} className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="text-lg font-bold text-ink-900">2. Tepat Kualitas</h4>
              <p className="mt-2 text-xs sm:text-sm text-ink-500 leading-relaxed">
                Seluruh produk berizin edar resmi Kemenkes RI, original dari principal terpercaya, dan disimpan sesuai standar CDAKB yang ketat.
              </p>
            </div>

            {/* 3. Tepat Waktu */}
            <div className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Clock size={24} className="w-6 h-6 shrink-0" />
              </div>
              <h4 className="text-lg font-bold text-ink-900">3. Tepat Waktu</h4>
              <p className="mt-2 text-xs sm:text-sm text-ink-500 leading-relaxed">
                Didukung rantai pasok dan armada pengiriman yang sigap untuk memastikan pesanan tiba tepat waktu di seluruh wilayah operasional.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── 5. TIM & KEMAMPUAN GUDANG WAREHOUSE ─── */}
      <RevealSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-ink-100 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand mb-3">
                <Building2 size={14} className="w-3.5 h-3.5 shrink-0" />
                Operasional &amp; Fasilitas
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                Didukung Tim Profesional &amp; Standar Penyimpanan Higienis
              </h2>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                Setiap produk yang keluar dari fasilitas kami ditangani oleh staf terlatih yang memahami protokol penyimpanan alat medis, reagen, dan bahan habis pakai sesuai kaidah CDAKB Kemenkes RI.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="w-4.5 h-4.5 shrink-0 text-brand mt-0.5" />
                  <p className="text-xs sm:text-sm text-ink-700">
                    <strong>Kontrol Suhu &amp; Kelembaban:</strong> Ruang penyimpanan reagen dan cairan medis terpantau secara berkala.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="w-4.5 h-4.5 shrink-0 text-brand mt-0.5" />
                  <p className="text-xs sm:text-sm text-ink-700">
                    <strong>Workshop &amp; Teknisi Tersertifikasi:</strong> Kesiapan tim teknisi untuk maintenance, kalibrasi, dan uji fungsi alat laboratorium.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="w-4.5 h-4.5 shrink-0 text-brand mt-0.5" />
                  <p className="text-xs sm:text-sm text-ink-700">
                    <strong>Sistem Logistik Rapi:</strong> Pencatatan stok digital dan pelacakan pengiriman untuk ketepatan waktu.
                  </p>
                </div>
              </div>
            </div>

            {/* Foto Tim Warehouse */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-ink-100 shadow-md">
              <Image
                src="/images/tim warehouse.jpeg"
                alt="Tim Warehouse PT Ariyan Medika Utama"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── 6. LEGALITAS & JANGKAUAN DISTRIBUSI ─── */}
      <RevealSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Kolom Kiri: Legalitas */}
          <div className="lg:col-span-5 rounded-3xl border border-ink-100 bg-white p-7 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-ink-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="w-5 h-5 shrink-0 text-brand" />
              Legalitas &amp; Izin Resmi
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-ink-700">
              <li className="flex items-center justify-between p-3 rounded-xl bg-ink-50/70 border border-ink-100">
                <span className="font-semibold">Badan Hukum:</span>
                <span className="font-bold text-ink-900">PT. Ariyan Medika Utama</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-xl bg-ink-50/70 border border-ink-100">
                <span className="font-semibold">NIB:</span>
                <span className="font-mono font-bold text-ink-900">2311230042439</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-xl bg-ink-50/70 border border-ink-100">
                <span className="font-semibold">Sertifikasi Mutu:</span>
                <span className="font-bold text-brand">CDAKB Kemenkes RI</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-xl bg-ink-50/70 border border-ink-100">
                <span className="font-semibold">Izin Edar &amp; Salur:</span>
                <span className="font-bold text-brand-teal">IDAK </span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-xl bg-ink-50/70 border border-ink-100">
                <span className="font-semibold">Kebijakan:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink-900">Kebijakan Privasi</span>
                  <Link href="/privacy" className="text-xs bg-white text-ink-700 border border-ink-200 px-2 py-1 rounded hover:bg-ink-100 transition-colors">Baca Kebijakan</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Kolom Kanan: Jangkauan Area */}
          <div className="lg:col-span-7 rounded-3xl border border-ink-100 bg-gradient-to-br from-slate-900 to-slate-800 p-7 sm:p-8 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-light mb-3">
                <MapPin size={14} className="w-3.5 h-3.5 shrink-0" />
                Wilayah Operasional
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Jangkauan Distribusi Jabodetabek &amp; Jawa Barat
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kantor pusat berlokasi strategis di Kota Depok, melayani pengiriman rutin ke rumah sakit, laboratorium, dan institusi pendidikan di seluruh wilayah DKI Jakarta, Bogor, Depok, Tangerang, Bekasi, Jawa Barat, hingga pengiriman khusus ke seluruh Indonesia.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-700">
              {["DKI Jakarta", "Kota & Kab. Bogor", "Kota Depok", "Tangerang Raya", "Kota & Kab. Bekasi", "Jawa Barat", "Nasional (Indonesia)"].map((area) => (
                <span
                  key={area}
                  className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── 7. PREVIEW DOKUMEN LEGALITAS ─── */}
      <RevealSection className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="preview-dokumen" className="text-center max-w-3xl mx-auto mb-10 scroll-mt-24">
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl tracking-tight">
            Dokumen Legalitas &amp; Sertifikasi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-500">
            Preview sertifikat resmi CDAKB dan IDAK dari Kementerian Kesehatan RI yang menjamin standar operasional kami.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* CDAKB Preview */}
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-sm flex flex-col h-[500px] sm:h-[600px] select-none group">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-brand flex items-center gap-2">
                <ShieldCheck size={20} className="w-5 h-5 shrink-0" />
                Sertifikat CDAKB
              </h4>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-ink-100 bg-ink-50/50 cursor-zoom-in group-hover:border-brand/50 transition-colors">
                  <Image
                    src="/docs/cdakb.png"
                    alt="Preview Sertifikat CDAKB Kemenkes RI"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                    <div className="bg-white/90 text-brand px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm backdrop-blur-sm">
                      <ZoomIn size={14} /> Klik untuk Perbesar
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] w-[800px] h-[90vh] bg-transparent border-0 shadow-none p-0 flex items-center justify-center">
                <div className="relative w-full h-full bg-white rounded-xl overflow-hidden p-2">
                  <Image
                    src="/docs/cdakb.png"
                    alt="Sertifikat CDAKB Kemenkes RI"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* IDAK Preview */}
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-sm flex flex-col h-[500px] sm:h-[600px] select-none group">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-brand-teal flex items-center gap-2">
                <ShieldCheck size={20} className="w-5 h-5 shrink-0" />
                Sertifikat IDAK
              </h4>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-ink-100 bg-ink-50/50 cursor-zoom-in group-hover:border-brand-teal/50 transition-colors">
                  <Image
                    src="/docs/idak.png"
                    alt="Preview Sertifikat IDAK Kemenkes RI"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity">
                    <div className="bg-white/90 text-brand-teal px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm backdrop-blur-sm">
                      <ZoomIn size={14} /> Klik untuk Perbesar
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] w-[800px] h-[90vh] bg-transparent border-0 shadow-none p-0 flex items-center justify-center">
                <div className="relative w-full h-full bg-white rounded-xl overflow-hidden p-2">
                  <Image
                    src="/docs/idak.png"
                    alt="Sertifikat IDAK Kemenkes RI"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </RevealSection>

      {/* ─── 8. BOTTOM CTA STRIP ─── */}
      <RevealSection className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-brand to-brand-teal p-8 sm:p-12 text-center text-white shadow-xl shadow-brand/25">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Siap Bermitra dengan PT Ariyan Medika Utama?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
              Konsultasikan kebutuhan alat kesehatan, reagen laboratorium, atau permintaan penawaran resmi untuk fasilitas kesehatan Anda sekarang.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="rounded-full h-12 px-8 bg-white text-brand font-bold shadow-lg hover:bg-slate-100 hover:scale-105 transition-all border-0">
                <a
                  href="https://wa.me/6285719906608?text=Halo%20PT%20Ariyan%20Medika%20Utama%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20alat%20kesehatan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat WhatsApp Sales →
                </a>
              </Button>
              <Button asChild className="rounded-full h-12 px-8 border-2 border-white bg-transparent text-white font-bold hover:bg-white hover:text-brand shadow-lg transition-all">
                <Link href="/produk">Jelajahi Produk Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
