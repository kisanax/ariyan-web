"use client";

import { useEffect } from "react";

export default function ScrollToAnchor() {
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 800); // Memberikan waktu agar animasi GSAP OurJourneySlider selesai inisialisasi
      }
    };

    // Jalankan saat load pertama kali
    handleHash();

    // Juga jalankan saat user mengeklik link ber-hash saat sudah berada di halaman ini
    window.addEventListener("hashchange", handleHash, false);
    return () => window.removeEventListener("hashchange", handleHash, false);
  }, []);

  return null;
}
