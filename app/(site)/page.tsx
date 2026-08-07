import Link from "next/link";
import Image from "next/image";
import { getProducts, urlFor } from "@/lib/sanity";
import RevealSection from "@/components/RevealSection";
import { Button } from "@/components/ui/button";
import LogoMarquee from "@/components/LogoMarquee";
import TrustLogosMultiRow from "@/components/TrustLogosMultiRow";
import WhyChooseUs from "@/components/WhyChooseUs";
import Hero from "@/components/Hero";

export default async function HomePage() {
  const products = await getProducts({});
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Trust strip — logo customer (RS, Puskesmas, dst), 3 baris arah gantian */}
      <RevealSection className="border-y border-ink-100 bg-ink-100/30 py-14">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
            Dipercaya oleh Institusi Kesehatan
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Puluhan rumah sakit, laboratorium, universitas, dan instansi
            pemerintah telah mempercayakan kebutuhan alat kesehatan mereka pada kami.
          </p>
        </div>
        <div className="mt-10">
          <TrustLogosMultiRow />
        </div>
      </RevealSection>

      {/* Profil / Mengapa Memilih Kami */}
      <RevealSection>
        <WhyChooseUs />
      </RevealSection>

      {/* Layanan Kami */}
      <RevealSection className="relative overflow-hidden py-section">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#f0f9ff] to-white" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              Bengkel Workshop Siap Melayani
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink-900 lg:text-4xl">
              Layanan Kami
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-500">
              Tim teknisi berpengalaman &amp; bersertifikat siap membantu
              maintenance, perbaikan, dan kalibrasi alat-alat laboratorium di
              institusi kesehatan Anda.
            </p>
          </div>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: "/images/service-maintenance.png",
                name: "Maintenance",
                desc: "Perawatan berkala alat laboratorium untuk performa optimal dan umur pakai lebih panjang.",
              },
              {
                image: "/images/service-kalibrasi.png",
                name: "Kalibrasi",
                desc: "Kalibrasi alat sesuai standar untuk menjamin akurasi hasil pemeriksaan.",
              },
              {
                image: "/images/service-perbaikan.png",
                name: "Perbaikan",
                desc: "Perbaikan dan troubleshooting alat laboratorium oleh teknisi bersertifikat.",
              },
              {
                image: "/images/service-instalasi.png",
                name: "Instalasi & Training",
                desc: "Instalasi alat baru dan pelatihan penggunaan untuk tim Anda.",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="group relative"
              >
                {/* Animated gradient border */}
                <div className="animate-border-glow absolute -inset-[1px] rounded-2xl opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
                {/* Card content */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white/80 p-0 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-transparent group-hover:bg-white group-hover:shadow-[0_24px_48px_-12px_rgba(18,115,179,0.15)] flex flex-col">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-ink-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-ink-900">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <a
                href="https://wa.me/6285719906608?text=Halo%2C%20saya%20ingin%20konsultasi%20layanan%20service%20alat%20lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi Layanan →
              </a>
            </Button>
          </div>
        </div>
      </RevealSection>

      {/* Principal & Brand Partners */}
      <RevealSection className="border-t border-ink-100 py-14">
        <p className="mb-10 text-center text-lg font-bold uppercase tracking-widest text-ink-500">
          Bekerja Sama dengan Principal Terpercaya
        </p>
        <LogoMarquee />
      </RevealSection>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-section lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
              Produk unggulan
            </h2>
            <p className="mt-2 text-ink-500">
              Sebagian dari ribuan produk yang kami distribusikan.
            </p>
          </div>
          <Link
            href="/produk"
            className="hidden text-sm font-medium text-brand hover:underline md:block"
          >
            Lihat semua produk →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((product) => (
            <RevealSection key={product.slug}>
              <Link href={`/produk/${product.slug}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100">
                  <Image
                    src={product.image ? urlFor(product.image).url() : "/images/placeholder-product.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand">
                  {product.category}
                </p>
                <h3 className="mt-1 text-lg font-medium text-ink-900">
                  {product.name}
                </h3>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Kategori Produk */}
      <RevealSection className="mx-auto max-w-6xl px-6 py-section lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
            Kategori Produk
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-500">
            Satu mitra, ribuan kebutuhan lab dan alkes Anda.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Laboratory",
              desc: "Hematology, Kimia Klinik, Mikrobiologi, dan lainnya",
              href: "/produk?category=laboratory",
            },
            {
              name: "BMHP",
              desc: "Bahan Medis Habis Pakai",
              href: "/produk?category=bmhp",
            },
            {
              name: "Non Medical Equipment",
              desc: "Peralatan penunjang non-medis",
              href: "/produk?category=non-medical",
            },
            {
              name: "General Supplies",
              desc: "Kebutuhan umum fasilitas kesehatan",
              href: "/produk?category=general-supplies",
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl border border-ink-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_20px_40px_-12px_rgba(18,115,179,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-white">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-ink-500 transition-colors group-hover:text-white/85">
                  {category.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </RevealSection>

    </div>
  );
}