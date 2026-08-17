"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/services" },
  { label: "Kontak", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-3 md:top-4 z-50 flex justify-center w-full px-4 md:px-8">
      <header
        className={cn(
          "flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/50 bg-white/80 px-4 py-2.5 sm:px-6 sm:py-3 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 ease-out",
          scrolled ? "py-2 sm:py-2.5 bg-white/90 shadow-xl shadow-black/10" : ""
        )}
      >
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo-icon.png"
            alt="Logo PT Ariyan Medika Utama"
            width={38}
            height={38}
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 object-contain"
            priority
          />
          <span className="text-sm font-bold tracking-tight text-ink-900 sm:text-base md:text-[1.15rem]">
            PT Ariyan Medika Utama
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-7 lg:gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.925rem] font-medium text-ink-700/85 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Button */}
        <Button asChild className="hidden md:inline-flex rounded-full px-6 h-10 font-semibold shadow-md shadow-brand/20">
          <a
            href="https://wa.me/6285719906608"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Sales
          </a>
        </Button>

        {/* Mobile */}
        <MobileNav />
      </header>
    </div>
  );
}