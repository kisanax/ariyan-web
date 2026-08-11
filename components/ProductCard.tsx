import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

const gradients = [
  "bg-gradient-to-br from-sky-200 via-sky-50 to-white/40",
  "bg-gradient-to-br from-slate-200 via-slate-50 to-white/40",
  "bg-gradient-to-br from-teal-200 via-teal-50 to-white/40",
  "bg-gradient-to-br from-blue-200 via-blue-50 to-white/40",
  "bg-gradient-to-br from-zinc-200 via-zinc-50 to-white/40",
  "bg-gradient-to-br from-emerald-200 via-emerald-50 to-white/40",
];

const getGradient = (identifier: string) => {
  if (!identifier) return gradients[0];
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

export default function ProductCard({ product }: { product: Product }) {
  // Gunakan gambar placeholder jika produk belum memiliki gambar di Sanity
  const imageUrl = product.image 
    ? urlFor(product.image).url() 
    : "/images/placeholder-product.svg";

  const slugStr = product.slug || product.name || "default";
  const gradientClass = getGradient(slugStr);

  return (
    <Link href={`/produk/${slugStr}`} className="group block h-full flex flex-col">
      <div className={`aspect-square overflow-hidden rounded-2xl flex items-center justify-center p-6 ${gradientClass}`}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          {product.category && (
            <p className="text-xs font-medium text-brand mb-1">{product.category}</p>
          )}
          <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-2 flex items-center justify-between border-t border-ink-100/60 pt-3">
          <div className="flex items-center gap-2 h-6">
            {product.brandLogo && (
               <Image src={urlFor(product.brandLogo).url()} alt={product.brand || "Brand"} width={60} height={24} className="h-full w-auto object-contain" />
            )}
            {!product.brandLogo && (product.brand || product.principal) && (
               <p className="text-xs text-ink-500 line-clamp-1">{product.brand || product.principal}</p>
            )}
          </div>
          <span className="text-[10px] font-medium text-ink-400 group-hover:text-brand transition-colors uppercase tracking-wider">Detail →</span>
        </div>
      </div>
    </Link>
  );
}
