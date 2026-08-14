"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  year: string;
  desc: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "2021",
    desc: "Nama 'Ariyan' lahir dari gagasan tiga sahabat yang memiliki impian bersama membangun perusahaan distribusi alat kesehatan berintegritas di Indonesia.",
    image: "/images/ariyan uniform.jpeg",
  },
  {
    year: "2022",
    desc: "Merintis langkah awal secara mandiri dengan modal Rp10 juta sambil pendiri masih berstatus karyawan, mendedikasikan waktu demi membangun fondasi usaha.",
    image: "/images/direktur stand raise hand.jpeg",
  },
  {
    year: "2023",
    desc: "Meraih kepercayaan pesanan pertama dari institusi medis dan menjalin kemitraan resmi dengan principal terkemuka di Indonesia.",
    image: "/images/direktur raise hand.jpeg",
  },
  {
    year: "2024",
    desc: "Resmi berbadan hukum PT. Ariyan Medika Utama dengan operasional mandiri dan izin legalitas lengkap, siap memperluas jaringan distribusi secara profesional.",
    image: "/images/tim warehouse.jpeg",
  },
  {
    year: "2025",
    desc: "Meraih sertifikasi resmi CDAKB & IDAK dari Kemenkes RI, dipercaya oleh lebih dari 50 Rumah Sakit, Klinik, dan Laboratorium di Jabodetabek & Jawa Barat.",
    image: "/images/tim warehouse 2.jpeg",
  },
  {
    year: "2026+",
    desc: "Melangkah lebih jauh dengan visi berkelanjutan untuk membuka lapangan kerja bagi putra-putri bangsa dan memperluas distribusi alat kesehatan ke seluruh nusantara.",
    image: "/images/hero-team.jpeg",
  },
];

export default function OurJourneySlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // DESKTOP & TABLET
      mm.add("(min-width: 768px)", () => {
        const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cardElements.length === 0) return;

        const totalSteps = milestones.length - 1;
        // Jarak antar kartu dibuat lebih lega dan lapang persis seperti referensi Eterna
        const cardSpacing = 560;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalSteps * 850}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressLineRef.current) {
                progressLineRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
              }
            },
          },
        });

        // Set initial positions with wide spacing
        cardElements.forEach((card, i) => {
          gsap.set(card, {
            x: i > 0 ? i * cardSpacing : 0,
            opacity: 1,
            scale: 1,
            transformOrigin: "left center",
          });
        });

        // Animate each step
        milestones.forEach((_, stepIndex) => {
          if (stepIndex === 0) return;

          const stepStartTime = (stepIndex - 1) * 1;

          for (let k = stepIndex; k < milestones.length; k++) {
            tl.to(
              cardElements[k],
              {
                x: (k - stepIndex) * cardSpacing,
                ease: "power1.inOut",
                duration: 1,
              },
              stepStartTime
            );
          }

          // Efek mengecil (scale: 0.82) dan meredup saat kartu bergeser ke kiri di belakang kartu baru
          tl.to(
            cardElements[stepIndex - 1],
            {
              opacity: 0.15,
              scale: 0.82,
              transformOrigin: "left center",
              ease: "power1.inOut",
              duration: 1,
            },
            stepStartTime
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
        };
      });

      // MOBILE
      mm.add("(max-width: 767px)", () => {
        const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cardElements.length === 0) return;

        const totalSteps = milestones.length - 1;
        const cardSpacing = 390;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalSteps * 650}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressLineRef.current) {
                progressLineRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
              }
            },
          },
        });

        cardElements.forEach((card, i) => {
          gsap.set(card, {
            x: i > 0 ? i * cardSpacing : 0,
            opacity: 1,
            scale: 1,
            transformOrigin: "left center",
          });
        });

        milestones.forEach((_, stepIndex) => {
          if (stepIndex === 0) return;
          const stepStartTime = (stepIndex - 1) * 1;

          for (let k = stepIndex; k < milestones.length; k++) {
            tl.to(
              cardElements[k],
              {
                x: (k - stepIndex) * cardSpacing,
                ease: "power1.inOut",
                duration: 1,
              },
              stepStartTime
            );
          }

          // Efek mengecil di mobile
          tl.to(
            cardElements[stepIndex - 1],
            {
              opacity: 0.15,
              scale: 0.85,
              transformOrigin: "left center",
              ease: "power1.inOut",
              duration: 1,
            },
            stepStartTime
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#dcf3eb] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12"
    >
      {/* ─── 1. Header Title ─── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 shrink-0">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-900 tracking-tight">
          Our Journey
        </h2>
      </div>

      {/* ─── 2. Stacking Timeline Cards Area ─── */}
      <div className="relative my-auto w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-4 sm:py-6 overflow-visible">
        {/* Container for the positioned stacking cards */}
        <div className="relative h-[380px] sm:h-[420px] lg:h-[460px] w-full">
          {milestones.map((item, index) => (
            <div
              key={item.year}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{ zIndex: index + 1 }}
              className="absolute left-0 top-0 flex flex-col w-[260px] sm:w-[310px] lg:w-[350px] bg-[#dcf3eb] pr-4"
            >
              {/* Photo Card */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-emerald-950/10">
                <Image
                  src={item.image}
                  alt={`Perjalanan Ariyan Medika ${item.year}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 360px"
                  priority={index < 2}
                />
              </div>

              {/* Year */}
              <h3 className="mt-4 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink-900 tracking-tight">
                {item.year}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm lg:text-base text-ink-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. Bottom Timeline Progress Line ─── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-2 shrink-0">
        <div className="relative h-[2px] w-full bg-emerald-950/20 rounded-full overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 h-full bg-ink-900 transition-all duration-75"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
