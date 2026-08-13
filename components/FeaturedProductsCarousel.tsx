"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";



export default function FeaturedProductsCarousel({ products }: { products: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-12 group">
      {/* Scrollable Container */}
      {(!products || products.length === 0) ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50">
          <p className="text-sm text-ink-500">Belum ada produk yang ditampilkan.</p>
        </div>
      ) : (
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6 lg:-mx-12 lg:px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => {
          const slug = typeof product.slug === 'string' ? product.slug : product.slug?.current || product._id || product.name;
          return (
          <div
            key={slug}
            // Menggunakan w-[42vw] pada mobile agar terlihat 2 kolom/card
            className="w-[42vw] sm:w-[280px] lg:w-[260px] shrink-0 snap-start"
          >
            <Link href={`/produk/${slug}`} className="group block h-full overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-ink-100/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(18,115,179,0.15)] flex flex-col">
              <div className="aspect-square w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#e4f3f5] to-[#f3f9fa]">
                <Image
                  src={
                    product.image
                      ? urlFor(product.image).url()
                      : "/images/placeholder-product.svg"
                  }
                  alt={product.name}
                  width={600}
                  height={450}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div>
                  {product.category && (
                    <p className="text-xs font-medium text-brand mb-1 sm:mb-2">
                      {product.category}
                    </p>
                  )}
                  <h3 className="text-sm sm:text-xl font-semibold tracking-tight text-ink-900 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-ink-100/60 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2 h-6 sm:h-7">
                    {product.brandLogo && (
                       <Image src={urlFor(product.brandLogo).url()} alt={product.brand || "Brand"} width={70} height={28} className="h-full w-auto object-contain" />
                    )}
                    {!product.brandLogo && (product.brand || product.principal) && (
                       <p className="text-xs text-ink-500 line-clamp-1">{product.brand || product.principal}</p>
                    )}
                  </div>
                  <span className="text-xs font-medium text-ink-400 group-hover:text-brand transition-colors uppercase tracking-wider">Detail</span>
                </div>
              </div>
            </Link>
          </div>
        )})}
      </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute left-2 top-[40%] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl border border-ink-100 text-ink-900 transition-all focus:outline-none z-10 md:-left-5 lg:-left-6 ${
          canScrollLeft ? "hover:scale-110" : "opacity-50 cursor-not-allowed"
        }`}
        aria-label="Previous products"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute right-2 top-[40%] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl border border-ink-100 text-ink-900 transition-all focus:outline-none z-10 md:-right-5 lg:-right-6 ${
          canScrollRight ? "hover:scale-110" : "opacity-50 cursor-not-allowed"
        }`}
        aria-label="Next products"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
