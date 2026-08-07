import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SearchAndSort from "@/components/SearchAndSort";
import { getProducts, getCategories, getBrands } from "@/lib/sanity";

// Gunakan 'force-dynamic' jika searchParams akan terus berubah
// Tapi karena kita pakai ISR di getProducts, kita biarkan default

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, brand, q, sort } = await searchParams;

  // Fetch data dari Sanity secara paralel
  const [products, categories, brands] = await Promise.all([
    getProducts({
      category: category,
      brand: brand,
      searchQuery: q,
      sort: sort,
    }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div>
      {/* Hero Banner */}
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <h1 className="text-4xl font-bold tracking-tight text-ink-900">
            Semua Produk
          </h1>
          <p className="mt-3 max-w-2xl text-ink-500">
            Jelajahi katalog lengkap alat kesehatan dan laboratorium kami. Dari
            peralatan hematologi hingga bahan medis habis pakai, temukan produk
            yang tepat untuk kebutuhan fasilitas kesehatan Anda.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <SearchAndSort total={products.length} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
          <ProductFilters categories={categories} brands={brands} />

          <div>
            {products.length === 0 ? (
              <div className="rounded-xl border border-ink-100 bg-ink-50/50 py-24 text-center">
                <svg className="mx-auto h-12 w-12 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="mt-4 text-ink-500">
                  Tidak ada produk yang cocok dengan filter ini.
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  Coba ubah atau hapus filter untuk melihat lebih banyak produk.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
