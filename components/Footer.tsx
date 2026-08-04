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
  { label: "IDAK", href: "/downloads" },
  { label: "CDAKB", href: "/downloads" },
  { label: "Kebijakan Privasi", href: "/privacy" },
];

export default function Footer() {
  return (
    <div className="px-4 pt-4 sm:px-6 lg:px-6">
      <footer className="mx-auto max-w-7xl rounded-t-[28px] border border-b-0 border-ink-900/10 bg-gradient-to-br from-[#FDF6EC] via-[#F3FAF7] to-[#E9F5FB] px-8 pb-8 pt-14 shadow-[0_-20px_50px_-20px_rgba(15,23,42,0.12)] sm:px-12">
        <div className="flex flex-wrap items-start justify-between gap-12 border-b border-ink-900/10 pb-12">
          <div className="max-w-sm">
            <div className="mb-4 flex flex-col items-start gap-3">
              <Image
                src="/images/logo-icon.png"
                alt="Logo PT Ariyan Medika Utama"
                width={32}
                height={32}
                className="h-20 w-20 object-contain"
              />
              <span className="text-4xl font-bold tracking-tight text-ink-900 sm:text-[38px]">
                Ariyan Medika Utama
              </span>
            </div>
            <p className="text-base leading-relaxed text-ink-500 sm:text-lg">
              Distributor alat kesehatan dan laboratorium tepercaya. Tepat
              Barang, Tepat Kualitas, Tepat Waktu — untuk seluruh Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div>
              <p className="mb-3 text-lg font-bold text-ink-900">
                Perusahaan
              </p>
              <ul className="space-y-1">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base text-ink-500 transition-colors hover:text-brand sm:text-lg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-lg font-bold text-ink-900">
                Legal
              </p>
              <ul className="space-y-1">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-base text-ink-500 transition-colors hover:text-brand sm:text-lg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-5 pt-6 sm:flex-row">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} PT Ariyan Medika Utama. Semua hak
            dilindungi.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/6285719906608"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-500 transition-colors hover:border-brand hover:text-brand"
              aria-label="WhatsApp"
            >
              WA
            </a>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-500">
              in
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-ink-500">
              ig
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}