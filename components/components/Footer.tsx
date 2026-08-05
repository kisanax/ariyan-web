import Link from "next/link";
import Image from "next/image";

const companyLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Produk", href: "/produk" },
  { label: "Layanan", href: "/services" },
  { label: "Kontak", href: "/contact" },
];

const legalLinks = [
  { label: "Sertifikasi IDAK", href: "/downloads" },
  { label: "Sertifikasi CDAKB", href: "/downloads" },
  { label: "Kebijakan Privasi", href: "/privacy" },
];

export default function Footer() {
  return (
    <div className="px-4 pt-4 sm:px-6 lg:px-10">
      <footer className="mx-auto max-w-7xl rounded-t-[28px] border border-b-0 border-ink-900/10 bg-gradient-to-br from-[#FDF6EC] via-[#F3FAF7] to-[#E9F5FB] px-8 pb-8 pt-14 sm:px-12">
        <div className="flex flex-wrap items-start justify-between gap-12 border-b border-ink-900/10 pb-12">
          <div className="max-w-sm">
            <div className="mb-3.5 flex items-center gap-2.5">
              <Image
                src="/images/logo-icon.png"
                alt="Logo PT Ariyan Medika Utama"
                width={32}
                height={32}
                className="h-6.5 w-6.5 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-ink-900">
                Ariyan Medika
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-500">
              Distributor alat kesehatan dan laboratorium tepercaya. Tepat
              Barang, Tepat Kualitas, Tepat Waktu — untuk seluruh Indonesia.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-500/70">
                Perusahaan
              </p>
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-700 transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-500/70">
                Legal &amp; Sertifikasi
              </p>
              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-700 transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500/70">
            © {new Date().getFullYear()} PT Ariyan Medika Utama. Semua hak
            dilindungi.
          </p>
          <div className="flex gap-5 text-xs text-ink-500/70">
            <a
              href="https://wa.me/6285719906608"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              WhatsApp
            </a>
            <span>LinkedIn</span>
            <span>Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
