"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchAndSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Debounce: tunggu 400ms setelah user berhenti mengetik sebelum update URL
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full border border-ink-300 px-5 py-2.5 text-sm focus:border-brand sm:max-w-xs"
      />
      <select
        defaultValue={searchParams.get("sort") || ""}
        onChange={(e) => updateSort(e.target.value)}
        className="rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 focus:border-brand"
      >
        <option value="">Urutkan: Relevansi</option>
        <option value="name-asc">Nama A-Z</option>
        <option value="name-desc">Nama Z-A</option>
      </select>
    </div>
  );
}
