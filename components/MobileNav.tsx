"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Building2,
  Package,
  Wrench,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", href: "/", icon: Home, desc: "Halaman utama & keunggulan" },
  { label: "Tentang Kami", href: "/about", icon: Building2, desc: "Profil, visi & komitmen" },
  { label: "Katalog Produk", href: "/produk", icon: Package, desc: "Alat lab, alkes & BMHP" },
  { label: "Layanan Service", href: "/services", icon: Wrench, desc: "Kalibrasi & uji fungsi" },
  { label: "Kontak & Lokasi", href: "/contact", icon: Phone, desc: "Alamat & WhatsApp sales" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Kunci scroll body saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tutup menu otomatis jika rute berpindah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      {/* ─── 1. Hamburger / Close Trigger Button ─── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
          isOpen
            ? "bg-slate-900 text-white shadow-md rotate-90"
            : "bg-ink-100/80 text-ink-900 hover:bg-ink-200/80"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* ─── 2. Full-Screen Backdrop & Slide-Down Menu Overlay ─── */}
      <div
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 z-40 px-4 pt-2 pb-6 transition-all duration-300 ease-out flex flex-col justify-between",
          isOpen
            ? "opacity-100 pointer-events-auto bg-slate-950/60 backdrop-blur-xl"
            : "opacity-0 pointer-events-none bg-transparent"
        )}
        onClick={() => setIsOpen(false)}
      >
        {/* Menu Container Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "w-full max-w-md mx-auto rounded-[28px] bg-white/95 backdrop-blur-2xl border border-white/60 p-5 shadow-2xl transition-all duration-300 ease-out",
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-6 scale-95 opacity-0"
          )}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200",
                    isActive
                      ? "bg-brand text-white shadow-md shadow-brand/25 font-bold"
                      : "text-ink-800 hover:bg-ink-100/70 active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-ink-100 text-ink-600 group-hover:bg-brand/10 group-hover:text-brand"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold leading-tight">
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "text-[11px] mt-0.5",
                          isActive ? "text-white/80" : "text-ink-500"
                        )}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      isActive ? "text-white" : "text-ink-400"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Quick Action & Info */}
          <div className="mt-5 pt-4 border-t border-ink-100 flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-brand to-brand-teal text-white font-bold shadow-lg shadow-brand/25 active:scale-95 transition-all"
            >
              <a
                href="https://wa.me/6285719906608?text=Halo%20PT%20Ariyan%20Medika%20Utama%2C%20saya%20ingin%20berkonsultasi%20mengenai%20alat%20kesehatan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat WhatsApp Sales
              </a>
            </Button>

            {/* CDAKB & Phone Badge */}
            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-ink-500 font-medium">
              <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CDAKB Kemenkes RI</span>
              </div>
              <a
                href="tel:02189080715"
                className="text-ink-600 hover:text-brand transition-colors"
              >
                (021) 89080715
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}