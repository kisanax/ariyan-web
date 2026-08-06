import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import RevealSection from "@/components/RevealSection";
import { Button } from "@/components/ui/button";
import LogoMarquee from "@/components/LogoMarquee";
import TrustLogosMultiRow from "@/components/TrustLogosMultiRow";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        {/* Background dots, fade ke bawah */}
        <div
          className="pointer-events-none absolute -top-24 inset-x-0 bottom-0 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_85%)]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-section pt-12 lg:grid-cols-2 lg:items-center lg:px-12">
          {/* Kolom teks */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              Service From Heart
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.15] tracking-tight text-ink-900 lg:text-6xl">
              Solusi distribusi{" "}
              <span className="bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-transparent">
                alat kesehatan
              </span>{" "}
              yang tepat, di setiap langkah.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-500">
              Tepat Barang, Tepat Kualitas, Tepat Waktu — melayani rumah
              sakit, laboratorium, dan institusi pendidikan kesehatan di
              seluruh Indonesia.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/produk">Lihat Produk</Link>
              </Button>
              <p className="mt-3 text-sm text-ink-500">
                ↳ Konsultasi kebutuhan alkes Anda, gratis
              </p>
            </div>
          </div>

          {/* Kolom foto + floating badges */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100">
              {/*
                Ganti gambar di bawah dengan foto tim/suasana kerja asli.
                Simpan file di: public/images/hero-team.jpg
                Lalu ganti src="/images/placeholder-product.svg" jadi src="/images/hero-team.jpg"
              */}
              <Image
                src="/images/hero-team.jpg"
                alt="Tim PT Ariyan Medika Utama"
                width={600}
                height={750}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Badge mengambang kiri atas */}
            <div className="absolute left-2 top-6 flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-white shadow-lg sm:-left-8">
              <span className="text-xs font-medium">✓ CDAKB Certified</span>
            </div>

            {/* Badge mengambang kanan bawah */}
            <div className="absolute right-2 bottom-8 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg sm:-right-8">
              <span className="text-xs font-semibold text-ink-900">
                50+ RS &amp; Institusi Terpercaya
              </span>
            </div>
          </div>
        </div>
      </section>

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
                    src={product.image}
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

      {/* Why choose us */}
      <RevealSection className="bg-ink-900 py-section text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Mengapa memilih kami
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-300">
            Kami melayani distribusi alat kesehatan sesuai sertifikat izin
            distribusi alat kesehatan yang dikeluarkan Kementerian Kesehatan
            Republik Indonesia dan sudah memiliki sertifikat CDAKB.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["IDAK", "CDAKB", "PKP"].map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Principal & Brand Partners */}
      <RevealSection className="border-t border-ink-100 py-14">
        <p className="mb-8 text-center text-xs uppercase tracking-widest text-ink-500">
          Bekerja Sama dengan Principal Terpercaya
        </p>
        <LogoMarquee />
      </RevealSection>
    </div>
  );
}