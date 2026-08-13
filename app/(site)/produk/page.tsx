import ProductCard from "@/components/ProductCard";
import StorefrontCategories from "@/components/StorefrontCategories";
import SearchAndSort from "@/components/SearchAndSort";
import ProductFilters from "@/components/ProductFilters";
import BrochureSection from "@/components/BrochureSection";
import { getProducts, getCategories, getBrands, getPrincipals, getBrochures } from "@/lib/sanity";
import Link from "next/link";

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { category, brand, principal, q, sort } = await searchParams;

  // Fetch data dari Sanity secara paralel
  const [products, categories, brands, principalsRaw, brochures] = await Promise.all([
    getProducts({
      category: category,
      brand: brand,
      principal: principal,
      searchQuery: q,
      sort: sort,
    }),
    getCategories(),
    getBrands(),
    getPrincipals(),
    getBrochures(),
  ]);

  const principals = principalsRaw.map(p => p.name);

  return (
    <div className="bg-[#f8fafd] min-h-screen pb-20">
      {/* 1. Main Hero Banner Slider (Simulasi) */}
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[32/9] w-full overflow-hidden rounded-2xl bg-[#1a8b9d] shadow-sm">
          {/* Ini adalah placeholder banner. Nanti bisa diganti dengan Image sungguhan */}
          <div className="absolute inset-0 flex items-center p-6 md:p-12 lg:p-16 z-10">
            <div className="max-w-xl text-white">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4 leading-tight">
                Katalog Alat Kesehatan & Laboratorium
              </h1>
              <p className="text-xs sm:text-sm md:text-lg opacity-90 mb-6 max-w-md">
                Temukan berbagai kebutuhan fasilitas kesehatan Anda dengan kualitas terbaik dan standar resmi.
              </p>
              <button className="bg-white text-brand px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-xs md:text-sm hover:scale-105 transition-transform shadow-lg">
                Lihat Promo
              </button>
            </div>
          </div>
          {/* Dekorasi geometris elegan */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-white/10 skew-x-12 translate-x-20 md:translate-x-32" />
          <div className="absolute right-0 bottom-0 top-0 w-1/4 bg-white/5 skew-x-12 translate-x-10 md:translate-x-16" />
        </div>
      </div>

      {/* 2. Promo Cards (Card Principal & Brand) */}
      <div className="mx-auto max-w-7xl px-4 mt-4 md:mt-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card Principal / Brand 1 */}
          <Link href="/produk?brand=Komitkami" className="group relative h-28 sm:h-32 md:h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-sm border border-blue-100/50 transition-all hover:shadow-md hover:border-blue-200">
             <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 z-10">
                <p className="text-[10px] md:text-xs font-bold text-brand uppercase tracking-widest mb-1">Featured Brand</p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ink-900 group-hover:text-brand transition-colors">KINGBTA Ziehl Neelsen</h3>
                <div className="mt-2 md:mt-3">
                  <span className="inline-block text-[10px] md:text-xs font-bold bg-brand/10 text-brand px-3 py-1.5 rounded-full group-hover:bg-brand group-hover:text-white transition-colors">Lihat Produk →</span>
                </div>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 sm:w-48 sm:h-48 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all" />
          </Link>
          
          {/* Card Principal / Brand 2 */}
          <Link href="/produk?category=BMHP" className="group relative h-28 sm:h-32 md:h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-white shadow-sm border border-emerald-100/50 transition-all hover:shadow-md hover:border-emerald-200">
             <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 z-10">
                <p className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Spesial Kategori</p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ink-900 group-hover:text-emerald-600 transition-colors">Bahan Medis Habis Pakai</h3>
                <div className="mt-2 md:mt-3">
                  <span className="inline-block text-[10px] md:text-xs font-bold bg-emerald-600/10 text-emerald-700 px-3 py-1.5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">Beli Sekarang →</span>
                </div>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 sm:w-48 sm:h-48 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          </Link>
        </div>
      </div>

      {/* 3. Filter Kategori (Icons) */}
      <div className="mx-auto max-w-7xl px-0 md:px-4 lg:px-8 mt-6 md:mt-10">
        <div className="bg-white md:rounded-3xl p-4 pt-6 md:p-6 shadow-sm border-y md:border border-ink-100/50">
          <div className="px-6 md:px-2 flex items-center justify-between mb-2">
            <h2 className="text-lg md:text-xl font-bold text-ink-900">Kategori Pilihan</h2>
          </div>
          <StorefrontCategories categories={categories} />
        </div>
      </div>

      {/* 4. Filter & Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Filters - Horizontal Minimalist */}
        <div className="mb-6 bg-white rounded-xl p-3 shadow-sm border border-ink-100/50">
          <ProductFilters categories={categories} brands={brands} principals={principals} />
        </div>

        {/* Search & Sort */}
        <div className="mb-6">
          <SearchAndSort total={products.length} />
        </div>

        {/* Product Grid - Full Width */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-ink-100/60 bg-white py-24 text-center shadow-sm">
            <div className="mx-auto w-16 h-16 bg-ink-50 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="font-medium text-ink-900 text-lg">Tidak ada produk ditemukan</p>
            <p className="mt-1 text-ink-500 text-sm">
              Coba ubah atau hapus filter kategori untuk melihat hasil lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* 5. Section Katalog & Brosur */}
      <BrochureSection brochures={brochures} />
    </div>
  );
}
