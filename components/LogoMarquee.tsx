"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ===== GANTI LOGO DI SINI =====
// Cukup ganti file di public/images/partners/ dengan nama yang sama,
// atau ubah path "src" di bawah kalau nama file logo asli kamu beda.
const partners = [
  { name: "Enseval Medika Prima", src: "/images/partners/emp.png" },
  { name: "OneMed", src: "/images/partners/onemed.png" },
  { name: "Arkan Medical", src: "/images/partners/arkan-medical.png" },
  { name: "Becton Dickinson", src: "/images/partners/bd.png" },
  { name: "KomitKami", src: "/images/partners/komitkami.png" },
  { name: "Labcare", src: "/images/partners/labcare.png" },
  { name: "Nusa Plus", src: "/images/partners/nusa-plus.png" },
  { name: "Sansico", src: "/images/partners/sansico.png" },
  { name: "Virtue", src: "/images/partners/virtue.png" },
];

export default function LogoMarquee() {
  // Logo di-duplikat 1x biar looping-nya mulus tanpa "patah"
  const items = [...partners, ...partners];
  const container = useRef<HTMLDivElement>(null);
  const marqueeInner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // GSAP Marquee Animation
      if (marqueeInner.current) {
        gsap.to(marqueeInner.current, {
          xPercent: -50,
          ease: "none",
          duration: 35, // Ubah untuk mengatur kecepatan (semakin besar semakin lambat)
          repeat: -1,
        });
      }
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div
        ref={marqueeInner}
        className="flex w-max items-center gap-10 sm:gap-16"
      >
        {items.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            // Frame card: Tinggi di-lock, Lebar menyesuaikan isi gambar (w-auto)
            className="relative flex h-16 sm:h-20 md:h-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white px-6 sm:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            {/* Menggunakan tag img standar agar browser membaca rasio asli gambar, bukan rasio buatan */}
            <img
              src={partner.src}
              alt={partner.name}
              loading="lazy"
              // Tinggi penuh dikurangi padding internal, lebar fleksibel
              className="h-[60%] sm:h-[65%] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}