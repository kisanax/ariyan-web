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
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center w-full px-4 md:px-8">
      <header
        className={cn(
          "flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-400 ease-out",
          scrolled ? "md:py-3" : "md:py-4 md:px-6"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-icon.png"
            alt="Logo PT Ariyan Medika Utama"
            width={40}
            height={40}
            className="h-7 w-7 object-contain md:h-10 md:w-10"
            priority
          />
          <span className="hidden text-base font-bold tracking-tight text-ink-900 md:inline md:text-[1.35rem]">
            PT Ariyan Medika Utama
          </span>
        </Link>
        <nav className="hidden gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink-700/80 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden md:inline-flex rounded-full px-6 font-semibold">
          <a
            href="https://wa.me/6285719906608"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Sales
          </a>
        </Button>
        <MobileNav />
      </header>
    </div>
  );
}