import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export default function ProductCard({ product }: { product: Product }) {
  // Gunakan gambar placeholder jika produk belum memiliki gambar di Sanity
  const imageUrl = product.image 
    ? urlFor(product.image).url() 
    : "/images/placeholder-product.svg";

  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-xl bg-ink-50">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-ink-500">{product.brand}</p>
        <p className="text-xs text-ink-400">{product.category}</p>
      </div>
    </Link>
  );
}
