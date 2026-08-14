import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/sanity";
import ProductGallery from "@/components/ProductGallery";
import BrochureSection from "@/components/BrochureSection";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) return notFound();

  const waMessage = encodeURIComponent(
    `Halo, saya ingin menanyakan ketersediaan dan penawaran harga untuk produk: ${product.name}`
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-ink-400">
            <Link href="/produk" className="hover:text-brand transition-colors">
              Produk
            </Link>
            <span>/</span>
            <span className="text-ink-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="w-full">
            <ProductGallery 
              images={product.gallery || (product.image ? [product.image] : [])} 
              productName={product.name} 
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {product.category || "Uncategorized"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              {product.brand || "No Brand"} · {product.principal || "No Principal"}
            </p>
            
            {(product.nie || product.tkdn) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.nie && (
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    NIE: {product.nie}
                  </span>
                )}
                {product.tkdn && (
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                    TKDN: {product.tkdn}
                  </span>
                )}
              </div>
            )}

            <p className="mt-6 leading-relaxed text-ink-600">
              {product.shortDescription || "Deskripsi produk belum tersedia."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/6285719906608?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand/90"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Minta Penawaran
            </a>
            </div>

            {/* Spesifikasi */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-10 border-t border-ink-100 pt-8">
                <h2 className="text-sm font-semibold text-ink-900">Spesifikasi</h2>
                <ul className="mt-3 space-y-2">
                  {product.specifications.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm text-ink-600">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-ink-300" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aplikasi */}
            {product.applications && product.applications.length > 0 && (
              <div className="mt-8 border-t border-ink-100 pt-8">
                <h2 className="text-sm font-semibold text-ink-900">Aplikasi</h2>
                <ul className="mt-3 space-y-2">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2 text-sm text-ink-600">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-ink-300" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brosur Terkait Produk */}
      {product.brochures && product.brochures.length > 0 && (
        <div className="border-t border-ink-100 bg-[#f8fafd] pt-12">
          <BrochureSection brochures={product.brochures} />
        </div>
      )}
    </div>
  );
}
