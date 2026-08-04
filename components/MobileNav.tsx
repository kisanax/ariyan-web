"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Buka menu navigasi"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <nav className="mb-6 flex flex-col gap-1">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3.5 text-base font-medium text-ink-900 transition-colors hover:bg-ink-100",
                index % 2 === 0 && "bg-ink-100/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="w-full">
          <a
            href="https://wa.me/6285719906608"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Sales
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}