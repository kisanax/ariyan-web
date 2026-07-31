"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductFilters({
  categories,
  brands,
}: {
  categories: string[];
  brands: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActiveFilters = activeCategory || activeBrand;

  return (
    <aside className="space-y-8">
      {hasActiveFilters && (
        <button
          onClick={() => router.push(pathname)}
          className="text-sm font-medium text-brand hover:underline"
        >
          Hapus semua filter
        </button>
      )}

      <div>
        <p className="mb-3 text-sm font-medium text-ink-900">Kategori</p>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
            >
              <input
                type="radio"
                name="category"
                checked={activeCategory === cat}
                onChange={() =>
                  updateParam("category", activeCategory === cat ? null : cat)
                }
                className="h-4 w-4 accent-brand"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-ink-900">Brand</p>
        <div className="space-y-2">
          {brands.map((b) => (
            <label
              key={b}
              className="flex cursor-pointer items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
            >
              <input
                type="radio"
                name="brand"
                checked={activeBrand === b}
                onChange={() => updateParam("brand", activeBrand === b ? null : b)}
                className="h-4 w-4 accent-brand"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
