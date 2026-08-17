"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Plus, Sparkles } from "lucide-react";

interface PrincipalItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  logo: string;
  href: string;
  tagColor: string;
  cardBg: string;
  borderHover: string;
}

const PRINCIPALS: PrincipalItem[] = [
  {
    id: "emp",
    name: "Enseval Medika Prima",
    category: "Diagnostic & Lab Equipment",
    summary: "Distributor terkemuka alat kesehatan, analyzer klinis & instrumen laboratorium presisi tinggi.",
    logo: "/images/partners/emp.png",
    href: "/produk?principal=ENSEVAL+MEDIKA+PRIMA",
    tagColor: "text-sky-700 bg-sky-50 border-sky-200",
    cardBg: "bg-gradient-to-b from-sky-50/70 via-white to-sky-50/30",
    borderHover: "hover:border-sky-300",
  },
  {
    id: "onemed",
    name: "OneMed",
    category: "BMHP & Hospital Care",
    summary: "Solusi perlengkapan medis habis pakai, instrumen perawatan rumah sakit & alat kesehatan terlengkap.",
    logo: "/images/partners/onemed.png",
    href: "/produk?brand=ONEMED",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    cardBg: "bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30",
    borderHover: "hover:border-emerald-300",
  },
  {
    id: "bd",
    name: "Becton Dickinson (BD)",
    category: "Vacutainer & Specimen System",
    summary: "Standar emas tabung vacutainer dan teknologi pengumpulan spesimen medis dunia.",
    logo: "/images/partners/bd.png",
    href: "/produk?brand=BECTON+DICKINSON",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
    cardBg: "bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30",
    borderHover: "hover:border-amber-300",
  },
  {
    id: "komitkami",
    name: "KomitKami",
    category: "Reagen & Mikrobiologi",
    summary: "Reagen diagnostik pewarnaan KINGBTA Ziehl Neelsen & reagensia laboratorium klinis berkualitas resmi.",
    logo: "/images/partners/komitkami.png",
    href: "/produk?brand=KOMITKAMI",
    tagColor: "text-cyan-700 bg-cyan-50 border-cyan-200",
    cardBg: "bg-gradient-to-b from-cyan-50/70 via-white to-cyan-50/30",
    borderHover: "hover:border-cyan-300",
  },
  {
    id: "arkan",
    name: "Arkan Medical",
    category: "Medical & Lab Instruments",
    summary: "Peralatan medis dan instrumen laboratorium terstandarisasi untuk fasilitas kesehatan modern.",
    logo: "/images/partners/arkan-medical.png",
    href: "/produk?principal=ARKAN+MEDICAL",
    tagColor: "text-teal-700 bg-teal-50 border-teal-200",
    cardBg: "bg-gradient-to-b from-teal-50/70 via-white to-teal-50/30",
    borderHover: "hover:border-teal-300",
  },
  {
    id: "labcare",
    name: "Labcare",
    category: "General Lab Supplies",
    summary: "Instrumen pendukung dan aksesoris penunjang laboratorium klinis serta institusi pendidikan.",
    logo: "/images/partners/labcare.png",
    href: "/produk?principal=LABCARE",
    tagColor: "text-blue-700 bg-blue-50 border-blue-200",
    cardBg: "bg-gradient-to-b from-blue-50/70 via-white to-blue-50/30",
    borderHover: "hover:border-blue-300",
  },
  {
    id: "nusa-plus",
    name: "Nusa Plus",
    category: "Clinical Essentials",
    summary: "Produk perlengkapan klinis dan konsumabel medis bermutu tinggi untuk fasilitas pelayanan kesehatan.",
    logo: "/images/partners/nusa-plus.png",
    href: "/produk?principal=NUSA+PLUS",
    tagColor: "text-rose-700 bg-rose-50 border-rose-200",
    cardBg: "bg-gradient-to-b from-rose-50/70 via-white to-rose-50/30",
    borderHover: "hover:border-rose-300",
  },
  {
    id: "sansico",
    name: "Sansico",
    category: "Diagnostic & Health",
    summary: "Inovasi produk diagnostik dan alat kesehatan teruji untuk akurasi medis optimal.",
    logo: "/images/partners/sansico.png",
    href: "/produk?principal=SANSICO",
    tagColor: "text-violet-700 bg-violet-50 border-violet-200",
    cardBg: "bg-gradient-to-b from-violet-50/70 via-white to-violet-50/30",
    borderHover: "hover:border-violet-300",
  },
  {
    id: "virtue",
    name: "Virtue",
    category: "Medical Devices",
    summary: "Perangkat medis berteknologi mutakhir untuk mendukung layanan kesehatan berintegritas.",
    logo: "/images/partners/virtue.png",
    href: "/produk?principal=VIRTUE",
    tagColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    cardBg: "bg-gradient-to-b from-indigo-50/70 via-white to-indigo-50/30",
    borderHover: "hover:border-indigo-300",
  },
];

export default function PrincipalHeroCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section className="w-full pt-4 pb-6">
      {/* ─── 1. Header Section ala Apple ("Get to know...") ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-semibold text-brand mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Principal &amp; Brand Resmi
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-900 tracking-tight">
            Kenali Principal &amp; Brand Kami.
          </h2>
          <p className="text-xs sm:text-sm text-ink-500 mt-1 max-w-xl">
            Didukung langsung oleh produsen alat kesehatan &amp; laboratorium ternama dengan jaminan legalitas CDAKB Kemenkes RI.
          </p>
        </div>

        {/* Apple-style Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous card"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 shadow-sm transition-all hover:bg-ink-100 hover:scale-105 active:scale-95 disabled:opacity-35 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next card"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 shadow-sm transition-all hover:bg-ink-100 hover:scale-105 active:scale-95 disabled:opacity-35 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ─── 2. Apple-Style Portrait Bento Cards Track (Light & Clean) ─── */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {PRINCIPALS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`group relative flex flex-col justify-between shrink-0 w-[270px] sm:w-[310px] md:w-[330px] h-[410px] sm:h-[450px] rounded-[28px] ${item.cardBg} p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-ink-100/90 snap-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] ${item.borderHover} overflow-hidden`}
          >
            {/* ─── TOP: Category + Title + Summary ─── */}
            <div className="relative z-10">
              <span
                className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-3 ${item.tagColor}`}
              >
                {item.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink-900 tracking-tight leading-snug group-hover:text-brand transition-colors">
                {item.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            {/* ─── MIDDLE: Logo Card Showcase ─── */}
            <div className="relative z-10 my-auto py-3">
              <div className="relative flex h-24 sm:h-28 w-full items-center justify-center rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-ink-100 group-hover:shadow-md group-hover:scale-[1.03] transition-all duration-300">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-full max-w-[85%] object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ─── BOTTOM: Call to action pill / plus button ─── */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-ink-100">
              <span className="text-xs font-bold text-brand group-hover:underline flex items-center gap-1">
                Lihat Produk
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>

              {/* Apple-style circular plus button */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 shadow-xs transition-all duration-200 group-hover:bg-brand group-hover:text-white group-hover:border-brand group-hover:scale-110">
                <Plus className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
