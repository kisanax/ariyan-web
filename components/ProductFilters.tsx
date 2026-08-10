"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ink-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-sm font-semibold text-ink-900 transition-colors hover:text-brand"
      >
        {title}
        <svg
          className={`h-4 w-4 text-ink-400 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

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

  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");
  const activePrincipal = searchParams.get("principal");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActiveFilters = activeCategory || activeBrand || activePrincipal;

  return (
    <aside>
      <div className="flex items-center justify-between border-b border-ink-100 pb-4">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-ink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-semibold text-ink-900">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => router.push(pathname)}
            className="text-xs font-medium text-brand hover:underline"
          >
            Hapus semua
          </button>
        )}
      </div>

      <FilterSection title="Kategori" defaultOpen={true}>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateParam("category", activeCategory === cat ? null : cat)
              }
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeCategory === cat
                  ? "bg-brand/10 font-medium text-brand"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-1">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() =>
                updateParam("brand", activeBrand === b ? null : b)
              }
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeBrand === b
                  ? "bg-brand/10 font-medium text-brand"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Principal">
        <div className="space-y-1">
          {principals.map((p) => (
            <button
              key={p}
              onClick={() =>
                updateParam("principal", activePrincipal === p ? null : p)
              }
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activePrincipal === p
                  ? "bg-brand/10 font-medium text-brand"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}
