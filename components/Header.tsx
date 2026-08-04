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
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-[padding] duration-400 ease-out sm:px-6",
        // Di mobile selalu inset+blur; di desktop cuma inset+blur pas scroll
        scrolled ? "md:px-4 md:pt-3 lg:px-6" : "md:px-0 md:pt-0"
      )}
    >
      <header
        className={cn(
          "flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-2.5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl backdrop-saturate-550 transition-all duration-400 ease-out md:px-5 md:py-3",
          // Di desktop, sebelum scroll: transparan & full padding, tanpa card
          !scrolled &&
            "md:border-transparent md:bg-transparent md:px-10 md:py-5 md:shadow-none md:backdrop-blur-none"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-icon.png"
            alt="Logo PT Ariyan Medika Utama"
            width={32}
            height={32}
            className="h-6.5 w-6.5 object-contain md:h-10 md:w-10"
            priority
          />
          <span className="hidden text-base font-semibold tracking-tight text-ink-900 md:inline md:text-lg">
            PT Ariyan Medika Utama
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700/80 transition-opacity hover:opacity-100 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
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