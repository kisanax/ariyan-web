"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface Milestone {
  year: string;
  stage: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "2021",
    stage: "Milestone 01",
    title: "Mimpi Tiga Sahabat",
    tagline: "Awal Mula Lahirnya Nama Ariyan",
    desc: "Gagasan dan nama 'Ariyan' lahir dari impian tiga sahabat yang memiliki cita-cita bersama untuk membangun perusahaan distribusi alat kesehatan berintegritas di Indonesia.",
    image: "/images/ariyan uniform.jpeg",
  },
  {
    year: "2022",
    stage: "Milestone 02",
    title: "Langkah Awal & Modal Rp10 Juta",
    tagline: "Dedikasi & Perjuangan Mandiri",
    desc: "Memulai langkah pertama secara sederhana dengan modal awal Rp10 juta. Dibangun sambil sang pendiri masih bekerja sebagai karyawan, membagi waktu demi meletakkan fondasi usaha sedikit demi sedikit.",
    image: "/images/direktur stand raise hand.jpeg",
  },
  {
    year: "2023",
    stage: "Milestone 03",
    title: "Kepercayaan Pesanan Pertama",
    tagline: "Kemitraan Principal Terkemuka",
    desc: "Meraih kepercayaan institusi medis pertama dan menjalin kerja sama resmi dengan principal terkemuka. Membuktikan komitmen pelayanan yang tulus dan dapat diandalkan.",
    image: "/images/direktur raise hand.jpeg",
  },
  {
    year: "2024",
    stage: "Milestone 04",
    title: "Pendirian Resmi PT & Mandiri",
    tagline: "Berdiri Mandiri & Legalitas Lengkap",
    desc: "Resmi berbadan hukum PT. Ariyan Medika Utama dengan operasional mandiri dan izin legalitas lengkap, siap memperluas jaringan distribusi alkes secara profesional.",
    image: "/images/tim warehouse.jpeg",
  },
  {
    year: "2025",
    stage: "Milestone 05",
    title: "Sertifikasi CDAKB & Ekspansi",
    tagline: "Standar Mutu Distribusi Kemenkes RI",
    desc: "Meraih sertifikasi resmi CDAKB & IDAK dari Kemenkes RI. Dipercaya oleh lebih dari 50 Rumah Sakit, Laboratorium Klinik, dan Fakultas Kedokteran di Jabodetabek & Jawa Barat.",
    image: "/images/tim warehouse 2.jpeg",
  },
  {
    year: "2026+",
    stage: "Milestone 06",
    title: "Membuka Peluang Bagi Negeri",
    tagline: "Visi Masa Depan Berkelanjutan",
    desc: "Melangkah lebih jauh dengan komitmen membuka lapangan kerja bagi putra-putri bangsa dan memperluas jangkauan distribusi kesehatan ke seluruh penjuru nusantara.",
    image: "/images/hero-team.jpeg",
  },
];

export default function OurJourneySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateScrollProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(100);
      return;
    }
    const currentProgress = (el.scrollLeft / maxScroll) * 100;
    setProgress(Math.min(100, Math.max(0, currentProgress)));

    // Calculate approximate active card
    const cardWidth = el.scrollWidth / milestones.length;
    const currentActive = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(milestones.length - 1, Math.max(0, currentActive)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const newIdx = Math.max(0, activeIndex - 1);
    scrollToCard(newIdx);
  };

  const handleNext = () => {
    const newIdx = Math.min(milestones.length - 1, activeIndex + 1);
    scrollToCard(newIdx);
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white md:py-28">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-teal mb-3">
              <Sparkles size={14} className="w-3.5 h-3.5 shrink-0 text-brand-teal" />
              Linimasa Perjalanan
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our Journey
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
              Dari sebuah mimpi sederhana dengan modal Rp10 juta, bertumbuh menjadi mitra distribusi alat kesehatan terpercaya berstandar CDAKB di Indonesia.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-white shadow-sm backdrop-blur-sm transition-all hover:border-brand hover:bg-brand disabled:opacity-30 disabled:hover:border-slate-700 disabled:hover:bg-slate-800/80 active:scale-95"
              aria-label="Milestone sebelumnya"
            >
              <ChevronLeft size={20} className="w-5 h-5 shrink-0" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === milestones.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-white shadow-sm backdrop-blur-sm transition-all hover:border-brand hover:bg-brand disabled:opacity-30 disabled:hover:border-slate-700 disabled:hover:bg-slate-800/80 active:scale-95"
              aria-label="Milestone berikutnya"
            >
              <ChevronRight size={20} className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Year Pills Navigation */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {milestones.map((m, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={m.year}
                onClick={() => scrollToCard(idx)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-brand to-brand-teal text-white shadow-md shadow-brand/30 ring-1 ring-white/20"
                    : "border border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {m.year} • {m.title}
              </button>
            );
          })}
        </div>

        {/* Timeline Slider Track */}
        <div className="relative mt-8">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className="group relative flex-none w-[82vw] sm:w-[380px] lg:w-[400px] snap-start flex flex-col rounded-2xl border border-slate-800/90 bg-slate-800/40 p-5 sm:p-6 backdrop-blur-md transition-all duration-500 hover:border-brand/50 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-1"
              >
                {/* Top Year & Stage Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-brand-teal">
                    {m.stage}
                  </span>
                  <span className="bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent font-sans">
                    {m.year}
                  </span>
                </div>

                {/* Photo Card */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-700/60 mb-5">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-brand-light mb-1">
                      {m.tagline}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-light transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom decorative timeline bar */}
                <div className="mt-5 pt-3 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span>PT Ariyan Medika Utama</span>
                  <span className="text-brand-teal font-semibold">Tepat • Cepat • Terpercaya</span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar Indicator */}
          <div className="mt-4 mx-auto max-w-xs h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-brand-teal transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
