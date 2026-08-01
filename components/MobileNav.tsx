"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/services" },
  { label: "Kontak", href: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Buka menu navigasi"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink-900 transition-colors hover:bg-ink-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="mt-6 w-full">
          <a
            href="https://wa.me/6285719906608"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Sales
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
