"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface PaginatedProductGridProps {
  products: any[];
}

export default function PaginatedProductGrid({ products }: PaginatedProductGridProps) {
  // Asumsi default desktop adalah 4 kolom.
  // 6 baris (rows) * 4 kolom = 24 produk awal.
  // Tambahan 4 baris * 4 kolom = 16 produk setiap kali load more.
  const INITIAL_COUNT = 24;
  const LOAD_MORE_COUNT = 16;
  
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
            className="rounded-full bg-white px-8 h-12 text-sm font-bold text-ink-900 border border-ink-200 shadow-sm hover:bg-ink-50 hover:text-brand transition-all"
          >
            Tampilkan Lebih Banyak
          </Button>
        </div>
      )}
    </>
  );
}
