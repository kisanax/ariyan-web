"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductFilters({
  categories,
  brands,
  principals,
}: {
  categories: string[];
  brands: string[];
  principals: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activeBrand = searchParams.get("brand") || "";
  const activePrincipal = searchParams.get("principal") || "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const hasActiveFilters = activeCategory || activeBrand || activePrincipal;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 pr-2 border-r border-ink-100 hidden sm:flex">
          <svg className="h-4 w-4 text-ink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-semibold text-ink-900">Filter</span>
        </div>
        
        <select
          value={activeCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 outline-none transition-colors hover:border-brand focus:border-brand focus:ring-1 focus:ring-brand"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={activeBrand}
          onChange={(e) => updateParam("brand", e.target.value)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 outline-none transition-colors hover:border-brand focus:border-brand focus:ring-1 focus:ring-brand"
        >
          <option value="">Semua Brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={activePrincipal}
          onChange={(e) => updateParam("principal", e.target.value)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 outline-none transition-colors hover:border-brand focus:border-brand focus:ring-1 focus:ring-brand"
        >
          <option value="">Semua Principal</option>
          {principals.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition-colors flex-shrink-0"
        >
          Hapus filter
        </button>
      )}
    </div>
  );
}
