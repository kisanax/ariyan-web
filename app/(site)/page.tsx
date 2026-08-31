import Link from "next/link";
import Image from "next/image";
import { getProducts, urlFor } from "@/lib/sanity";
import RevealSection from "@/components/RevealSection";
import { Button } from "@/components/ui/button";
import LogoMarquee from "@/components/LogoMarquee";
import TrustLogosMultiRow from "@/components/TrustLogosMultiRow";
import WhyChooseUs from "@/components/WhyChooseUs";
import Hero from "@/components/Hero";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import {
  Microscope,
  Syringe,
  Stethoscope,
  Boxes,
  ArrowRight,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default async function HomePage() {
  const products = await getProducts({});
  const featured = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Trust strip — logo customer (RS, Puskesmas, dst), 3 baris arah gantian */}
      <RevealSection className="border-y border-ink-100 bg-ink-100/30 py-14">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
            Dipercaya oleh Institusi Kesehatan
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Puluhan rumah sakit, laboratorium, universitas, dan instansi
            pemerintah telah mempercayakan kebutuhan alat kesehatan mereka pada kami.
          </p>
        </div>
        <div className="mt-10">
          <TrustLogosMultiRow />
        </div>
      </RevealSection>

      {/* Profil / Mengapa Memilih Kami */}
      <RevealSection>
        <WhyChooseUs />
      </RevealSection>

      {/* Layanan Kami */}
      <RevealSection className="relative overflow-hidden py-section">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#f0f9ff] to-white" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              Bengkel Workshop Siap Melayani
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink-900 lg:text-4xl">
              Layanan Kami
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-500">
              Tim teknisi berpengalaman &amp; bersertifikat siap membantu
              maintenance, perbaikan, dan kalibrasi alat-alat laboratorium di
              institusi kesehatan Anda.
            </p>

            {/* Accreditation logos */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="flex items-center rounded-xl border border-ink-100 bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/images/certifications/elvakal.jpg"
                  alt="Elvakal — Lab Kalibrasi & Pengujian"
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center rounded-xl border border-ink-100 bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/images/certifications/KAN.jpg"
                  alt="KAN — Komite Akreditasi Nasional"
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: "/images/service-maintenance.png",
                name: "Maintenance",
                desc: "Perawatan berkala alat laboratorium untuk performa optimal dan umur pakai lebih panjang.",
              },
              {
                image: "/images/service-kalibrasi.png",
                name: "Kalibrasi",
                desc: "Kalibrasi alat sesuai standar untuk menjamin akurasi hasil pemeriksaan.",
              },
              {
                image: "/images/service-perbaikan.png",
                name: "Perbaikan",
                desc: "Perbaikan dan troubleshooting alat laboratorium oleh teknisi bersertifikat.",
              },
              {
                image: "/images/service-instalasi.png",
                name: "Instalasi & Training",
                desc: "Instalasi alat baru dan pelatihan penggunaan untuk tim Anda.",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="group relative"
              >
                {/* Animated gradient border */}
                <div className="animate-border-glow absolute -inset-[1px] rounded-2xl opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
                {/* Card content */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white/80 p-0 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-transparent group-hover:bg-white group-hover:shadow-[0_24px_48px_-12px_rgba(18,115,179,0.15)] flex flex-col">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-ink-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-ink-900">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <a
                href="https://wa.me/6285719906608?text=Halo%2C%20saya%20ingin%20konsultasi%20layanan%20service%20alat%20lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi Layanan →
              </a>
            </Button>
          </div>
        </div>
      </RevealSection>

      {/* Principal & Brand Partners */}
      <RevealSection className="border-t border-ink-100 py-14">
        <p className="mb-10 text-center text-lg font-bold uppercase tracking-widest text-ink-500">
          Bekerja Sama dengan Principal Terpercaya
        </p>
        <LogoMarquee />
      </RevealSection>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-section lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
              Produk unggulan
            </h2>
            <p className="mt-2 text-ink-500">
              Sebagian dari ribuan produk yang kami distribusikan.
            </p>
          </div>
          <Link
            href="/produk"
            className="hidden text-sm font-medium text-brand hover:underline md:block"
          >
            Lihat semua produk →
          </Link>
        </div>

        <FeaturedProductsCarousel products={featured} />
      </section>

      {/* ─── Kategori Produk (Visual Bento Grid) ─── */}
      <RevealSection className="mx-auto max-w-7xl px-6 py-section lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1 text-xs font-bold text-brand mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Portofolio Distribusi Lengkap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900">
            Kategori Produk Unggulan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-500 leading-relaxed">
            Satu mitra distribusi terpercaya untuk ribuan kebutuhan alat medis, laboratorium, dan bahan habis pakai.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Laboratory",
              tag: "Alat & Reagen Lab",
              desc: "Hematology, Kimia Klinik, Centrifuge, Urinalysis, Mikrobiologi & Reagen Diagnostik.",
              icon: Microscope,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              href: "/produk?category=Laboratory",
            },
            {
              name: "BMHP",
              tag: "Bahan Habis Pakai",
              desc: "Tabung Vacutainer BD, Syringe, IV Catheter, Masker, Sarung Tangan & Disposable Supplies.",
              icon: Syringe,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              href: "/produk?category=BMHP",
            },
            {
              name: "Non Medical Equipment",
              tag: "Fasilitas & Penunjang",
              desc: "Hospital Bed, Furniture Rumah Sakit, Lemari Obat, Lampu Operasi & Alat Penunjang Medis.",
              icon: Stethoscope,
              color: "text-amber-600 bg-amber-50 border-amber-100",
              href: "/produk?category=Non+Medical+Equipment",
            },
            {
              name: "General Supplies",
              tag: "Perlengkapan Umum",
              desc: "Kebutuhan sanitasi fasilitas kesehatan, sterilisasi ruangan & perlengkapan operasional.",
              icon: Boxes,
              color: "text-cyan-600 bg-cyan-50 border-cyan-100",
              href: "/produk?category=General+Supplies",
            },
          ].map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative flex flex-col justify-between rounded-3xl border border-ink-200/70 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand/40 overflow-hidden"
              >
                <div>
                  {/* Top: Icon + Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${category.color} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 bg-ink-100/70 px-2.5 py-1 rounded-full">
                      {category.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-ink-900 group-hover:text-brand transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-ink-600 leading-relaxed">
                    {category.desc}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-xs font-bold text-brand">
                  <span className="group-hover:underline">Jelajahi Kategori</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </RevealSection>

      {/* ─── Grand Bottom Final CTA Banner ─── */}
      <RevealSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-dark via-brand to-brand-teal p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-brand/25">
          {/* Ambient Glow & Grid Accent */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* CDAKB Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-xs font-semibold text-white mb-6 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Sertifikasi Resmi CDAKB &amp; IDAK Kemenkes RI
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Siap Memenuhi Kebutuhan Alat Kesehatan &amp; Laboratorium Anda?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mx-auto">
              Konsultasikan pengadaan alat medis, reagen, dan bahan habis pakai bersama PT Ariyan Medika Utama. Kami melayani rumah sakit, klinik, universitas, dan laboratorium di seluruh wilayah Indonesia.
            </p>

            {/* 3 Pillars Summary */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left">
              {[
                { label: "Tepat Barang", desc: "Sesuai spesifikasi & izin edar resmi" },
                { label: "Tepat Kualitas", desc: "Standar mutu CDAKB & bergaransi" },
                { label: "Tepat Waktu", desc: "Pengiriman cepat & aman terpercaya" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/10 border border-white/15 p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    {item.label}
                  </div>
                  <p className="text-[11px] text-white/75 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full h-12 px-8 bg-white text-brand font-bold shadow-xl hover:bg-slate-100 hover:scale-105 transition-all border-0"
              >
                <a
                  href="https://wa.me/6285719906608?text=Halo%20PT%20Ariyan%20Medika%20Utama%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20alat%20kesehatan%20dan%20laboratorium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat WhatsApp Sales →
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="rounded-full h-12 px-8 border-2 border-white bg-transparent text-white font-bold hover:bg-white hover:text-brand shadow-lg transition-all"
              >
                <Link href="/produk">
                  <FileText className="mr-2 h-4 w-4" />
                  Jelajahi Semua Produk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}