import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import RevealSection from "@/components/RevealSection";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background dots, fade ke bawah */}
        <div
          className="pointer-events-none absolute -top-24 inset-x-0 bottom-0 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_85%)]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
            backgroundSize: "16px 16px",
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
            <div className="absolute -left-4 top-6 flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-white shadow-lg sm:-left-8">
              <span className="text-xs font-medium">✓ CDAKB Certified</span>
            </div>

            {/* Badge mengambang kanan bawah */}
            <div className="absolute -right-4 bottom-8 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg sm:-right-8">
              <span className="text-xs font-semibold text-ink-900">
                50+ RS &amp; Institusi Terpercaya
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <RevealSection className="border-y border-ink-100 bg-ink-100/30 py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <p className="text-center text-xs uppercase tracking-widest text-ink-500">
            Dipercaya oleh institusi kesehatan di seluruh Indonesia
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-ink-500">
            <span>RSUD Kota Bogor</span>
            <span>RSUD Sayang</span>
            <span>Universitas Kristen Indonesia</span>
            <span>Dinas Kesehatan Kab. Bandung</span>
            <span>RSUP dr. Sitanala</span>
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
    </div>
  );
}