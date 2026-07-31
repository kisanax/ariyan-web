import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const waMessage = encodeURIComponent(
    `Halo, saya ingin menanyakan ketersediaan dan penawaran harga untuk produk: ${product.name}`
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {product.brand} · {product.principal}
          </p>
          <p className="mt-6 text-ink-700">{product.shortDescription}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/6285719906608?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand px-7 py-3 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Minta Penawaran via WhatsApp
            </a>
            <button className="rounded-full border border-ink-300 px-7 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-brand hover:text-brand">
              Download Brosur
            </button>
          </div>

          <div className="mt-12 border-t border-ink-100 pt-8">
            <h2 className="text-sm font-medium text-ink-900">Spesifikasi</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-500">
              {product.specifications.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-ink-900">Aplikasi</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-500">
              {product.applications.map((app) => (
                <li key={app}>{app}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
