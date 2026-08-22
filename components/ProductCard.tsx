import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export default function ProductCard({ product }: { product: Product }) {
  // Gunakan gambar placeholder jika produk belum memiliki gambar di Sanity
  const imageUrl = product.image 
    ? urlFor(product.image).url() 
    : "/images/placeholder-product.svg";

  const slugStr = product.slug || product.name || "default";

  return (
    <Link href={`/produk/${slugStr}`} className="group block h-full flex flex-col">
      {/* Container gambar: padding diperkecil (p-1 / sm:p-2) agar gambar 1000x1000 tampil proporsional dan tidak menciut */}
      <div className="aspect-square overflow-hidden rounded-2xl flex items-center justify-center p-1 sm:p-2 bg-white">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-2.5 sm:mt-3 flex flex-col gap-1 flex-1 justify-between">
        <div>
          {product.category && (
            <p className="text-[11px] sm:text-xs font-semibold text-brand mb-0.5">{product.category}</p>
          )}
          <h3 className="text-xs sm:text-sm font-semibold text-ink-900 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-1.5 flex items-center justify-between border-t border-ink-100/60 pt-2">
          <div className="flex items-center gap-1.5 h-5 sm:h-6">
            {product.brandLogo && (
               <Image src={urlFor(product.brandLogo).url()} alt={product.brand || "Brand"} width={50} height={20} className="h-full w-auto object-contain" />
            )}
            {!product.brandLogo && (product.brand || product.principal) && (
               <p className="text-[11px] text-ink-500 line-clamp-1">{product.brand || product.principal}</p>
            )}
          </div>
          <span className="text-[10px] font-medium text-ink-400 group-hover:text-brand transition-colors uppercase tracking-wider">Detail →</span>
        </div>
      </div>
    </Link>
  );
}
