import ProductCard from "@/components/ProductCard";
import PaginatedProductGrid from "@/components/PaginatedProductGrid";
import StorefrontCategories from "@/components/StorefrontCategories";
import SearchAndSort from "@/components/SearchAndSort";
import ProductFilters from "@/components/ProductFilters";
import BrochureSection from "@/components/BrochureSection";
import PrincipalHeroCarousel from "@/components/PrincipalHeroCarousel";
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
      {/* 1. Principal & Brand Bento Carousel (Apple-Style) */}
      <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-8">
        <PrincipalHeroCarousel />
      </div>

      {/* 2. Filter Kategori (Icons) */}
      <div className="mx-auto max-w-7xl px-0 md:px-4 lg:px-8 mt-2 md:mt-4">
        <div className="bg-white md:rounded-3xl p-4 pt-6 md:p-6 shadow-sm border-y md:border border-ink-100/50">
          <div className="px-6 md:px-2 flex items-center justify-between mb-2">
            <h2 className="text-lg md:text-xl font-bold text-ink-900">Kategori Pilihan</h2>
          </div>
          <StorefrontCategories categories={categories} />
        </div>
      </div>

      {/* 3. Filter & Product Grid */}
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
          <PaginatedProductGrid products={products} />
        )}
      </div>

      {/* 5. Section Katalog & Brosur */}
      <BrochureSection brochures={brochures} />
    </div>
  );
}
