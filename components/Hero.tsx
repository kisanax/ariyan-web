"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    // Bikin timeline animasi yang super smooth khas Upsunday/Apple
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Gambar background sedikit zoom-out dan memudar masuk
    tl.fromTo(
      ".hero-bg",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
      // 2. Ornamen SVG swoosh masuk secara halus
      .fromTo(
        ".hero-swoosh",
        { opacity: 0, x: -50 },
        { opacity: 0.7, x: 0, duration: 1.2 },
        "-=1.2"
      )
      // 3. Titik dekoratif muncul satu per satu
      .fromTo(
        ".hero-dots span",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
        "-=0.8"
      )
      // 4. Judul naik dan muncul
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      )
      // 5. Deskripsi menyusul
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      )
      // 6. Tombol-tombol muncul
      .fromTo(
        ".hero-btns",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      // 7. Kartu sertifikat & institusi masuk dari kiri
      .fromTo(
        ".hero-card",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15 },
        "-=0.5"
      );
  }, { scope: container });

  return (
    <section ref={container} className="relative flex min-h-[100vh] -mt-24 items-center overflow-hidden bg-white">
      {/* Full-bleed Background Image */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src="/images/hero-team.jpg"
          alt="Tim PT Ariyan Medika Utama"
          fill
          className="object-cover object-center sm:object-right"
          priority
        />
      </div>

      {/* Sweeping White Gradient Overlay */}
      {/* Gradasi membulat (radial) yang secara spesifik HANYA memutihkan area di belakang teks (kiri atas) dan membiarkan sisi lain benar-benar jernih */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_120%_120%_at_25%_45%,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.75)_35%,_transparent_60%)]" />
      {/* Extra bottom gradient for mobile to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />

      {/* Elegant SVG Swoosh Ornaments */}
      <svg
        className="hero-swoosh pointer-events-none absolute left-0 top-0 z-0 h-full w-full opacity-70"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary Swoosh */}
        <path d="M-10 110 C 20 80, 40 100, 110 30" stroke="url(#paint0_linear)" strokeWidth="0.3" fill="none" />
        {/* Secondary Swoosh */}
        <path d="M-10 95 C 30 70, 50 110, 110 50" stroke="url(#paint1_linear)" strokeWidth="0.15" fill="none" />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="100" x2="100" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#84cc16" />
            <stop offset="1" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="0" y1="95" x2="100" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" />
            <stop offset="1" stopColor="#1fb89a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl 2xl:max-w-[90rem] px-6 pt-32 pb-20 sm:py-24 lg:px-12 2xl:px-20 lg:py-32">

        {/* Left-Aligned Text Content */}
        <div className="max-w-2xl 2xl:max-w-3xl">
          {/* Small decorative dots like Kalbe */}
          <div className="hero-dots mb-6 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-lime"></span>
            <span className="h-2 w-2 rounded-full bg-ink-700"></span>
            <span className="h-2 w-2 rounded-full bg-ink-700"></span>
            <span className="h-2 w-2 rounded-full bg-ink-700"></span>
            <span className="h-2 w-2 rounded-full bg-ink-700"></span>
          </div>

          <h1 className="hero-title text-4xl font-extrabold leading-[1.15] tracking-tight text-ink-900 md:text-5xl lg:text-[3.25rem] 2xl:text-[4.25rem]">
            Akses Alat Kesehatan Berkualitas untuk{" "}
            <span className="bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-transparent">
              Kehidupan yang Lebih Baik
            </span>
          </h1>

          <p className="hero-desc mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl 2xl:text-2xl 2xl:leading-relaxed">
            Mendukung peningkatan mutu pelayanan rumah sakit, klinik, dan
            laboratorium di seluruh Indonesia dengan jaminan standar CDAKB Kemenkes RI.
          </p>

          <div className="hero-btns mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="h-14 rounded-full bg-gradient-to-r from-brand to-brand-teal px-8 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/35 border-0">
              <Link href="/produk">Eksplorasi Produk</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-ink-200 bg-white/80 px-8 text-base font-semibold text-ink-700 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md">
              <a href="https://wa.me/6285719906608?text=Halo" target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Floating Cards (Kalbe Style) */}
        <div className="mt-16 flex flex-col items-start gap-4 sm:mt-24 sm:flex-row sm:items-center">

          {/* CDAKB Certificate Logo */}
          <div className="hero-card flex items-center justify-center">
            <Image
              src="/images/certifications/cdakb.png"
              alt="Sertifikasi Resmi CDAKB"
              width={400}
              height={160}
              // Shadow ganda diperhalus agar tidak terlalu pekat/hitam di mobile, namun teks putih tetap bisa terbaca
              className="h-28 sm:h-40 w-auto object-contain object-left [filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.15))_drop-shadow(0_0_12px_rgba(0,0,0,0.35))] transition-transform duration-300 hover:-translate-y-1"
            />
          </div>

          {/* Trusted By Card */}
          <div className="hero-card flex items-center gap-3.5 rounded-2xl border border-white/40 bg-white/70 p-4 pr-6 shadow-xl shadow-black/5 backdrop-blur-md">
            <div className="flex -space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand text-xs font-bold text-white shadow-sm">RS</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-teal text-xs font-bold text-white shadow-sm">Lab</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-xs font-bold text-white shadow-sm">+50</div>
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold text-ink-900">50+ Institusi</p>
              <p className="text-xs font-medium text-ink-500">Mitra Terpercaya</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
