import { products, categories, brands } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SearchAndSort from "@/components/SearchAndSort";

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, brand, q, sort } = await searchParams;

  // Catatan: filtering di sini masih di level array (data dummy).
  // Nanti saat pindah ke Sanity, logic ini dipindah ke GROQ query
  // supaya tidak fetch semua produk sekaligus.
  let filtered = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  if (sort === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900">
          Produk
        </h1>
        <p className="mt-2 text-ink-500">
          {filtered.length} produk ditemukan
        </p>
      </div>

      <SearchAndSort />

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <ProductFilters categories={categories} brands={brands} />

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-ink-100 py-24 text-center">
              <p className="text-ink-500">
                Tidak ada produk yang cocok dengan filter ini.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
