"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function ProductGallery({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Jika tidak ada gambar, tampilkan placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-ink-50">
        <Image
          src="/images/placeholder-product.svg"
          alt={productName}
          width={600}
          height={600}
          className="h-full w-full object-contain p-8"
        />
      </div>
    );
  }

  const mainImageUrl = urlFor(images[currentIndex]).url();

  return (
    <div className="flex flex-col gap-4">
      {/* Gambar Utama */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white border border-ink-100 shadow-sm relative group">
        <Image
          src={mainImageUrl}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnail Gallery (Hanya muncul jika gambar lebih dari 1) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {images.map((img, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={img._key || index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-xl border-2 transition-all snap-start ${
                  isSelected 
                    ? "border-brand shadow-md scale-100 opacity-100" 
                    : "border-transparent bg-white shadow-sm hover:border-brand/40 opacity-70 hover:opacity-100 hover:scale-95"
                } bg-white flex items-center justify-center`}
              >
                <div className={`absolute inset-0 ${isSelected ? "bg-brand/5" : "bg-ink-50/50"}`} />
                <Image
                  src={urlFor(img).width(200).height(200).url()}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain p-2 relative z-10"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
