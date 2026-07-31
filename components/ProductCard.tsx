import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand">
        {product.category}
      </p>
      <h3 className="mt-1 text-base font-medium text-ink-900">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-ink-500">{product.brand}</p>
    </Link>
  );
}
