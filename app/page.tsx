import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import RevealSection from "@/components/RevealSection";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-section pt-32 text-center lg:px-12">
        <p className="text-sm font-medium uppercase tracking-widest text-brand">
          Service From Heart
        </p>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight text-ink-900 lg:text-7xl">
          Solusi distribusi alat kesehatan
          <br className="hidden lg:block" /> yang tepat, di setiap langkah.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500">
          Tepat Barang, Tepat Kualitas, Tepat Waktu — melayani rumah sakit,
          laboratorium, dan institusi pendidikan kesehatan di seluruh
          Indonesia.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/produk"
            className="rounded-full bg-brand px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Lihat Produk
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-ink-300 px-7 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-brand hover:text-brand"
          >
            Hubungi Kami
          </Link>
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
