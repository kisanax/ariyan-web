import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/services" },
  { label: "Kontak", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-icon.png"
            alt="Logo PT Ariyan Medika Utama"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-ink-900">
            PT Ariyan Medika Utama
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-700 transition-colors hover:text-brand"
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
      </div>
    </header>
  );
}
