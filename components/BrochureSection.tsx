"use client";

import { useState } from "react";
import { Brochure, urlFor } from "@/lib/sanity";
import PdfThumbnail from "@/components/PdfThumbnail";
import BrochurePreviewModal from "@/components/BrochurePreviewModal";

export default function BrochureSection({ brochures }: { brochures: Brochure[] }) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (!brochures || brochures.length === 0) return null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        {/* Framed Container */}
        <div className="rounded-2xl border border-ink-100/60 bg-white p-6 md:p-10 shadow-sm">
          {/* Section Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand mb-3">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Gratis
            </div>
            <h2 className="text-xl font-bold text-ink-900 md:text-2xl">
              Katalog & Brosur
            </h2>
            <p className="mt-1.5 text-xs text-ink-400 max-w-md mx-auto">
              Unduh katalog dan brosur produk kami untuk informasi lengkap mengenai spesifikasi dan fitur.
            </p>
          </div>

          {/* Brochure Cards Grid - Compact */}
          <div className="mx-auto max-w-5xl grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {brochures.map((brochure, index) => (
              <div
                key={brochure._id}
                className="group relative overflow-hidden rounded-xl border border-ink-100/60 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand/30 hover:-translate-y-0.5"
              >
                {/* PDF Thumbnail - Compact */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  <PdfThumbnail
                    fileUrl={brochure.fileUrl}
                    alt={brochure.title}
                    thumbnailUrl={brochure.thumbnail ? urlFor(brochure.thumbnail).url() : undefined}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 transition-all duration-300 group-hover:bg-ink-900/40">
                    <div className="flex flex-col gap-1.5 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <button
                        onClick={() => setPreviewIndex(index)}
                        className="inline-flex items-center justify-center gap-1 rounded-md bg-white px-3 py-1.5 text-[10px] font-semibold text-ink-800 shadow transition-colors hover:bg-brand hover:text-white"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                      <a
                        href={brochure.fileUrl}
                        download
                        className="inline-flex items-center justify-center gap-1 rounded-md bg-brand px-3 py-1.5 text-[10px] font-semibold text-white shadow transition-colors hover:bg-brand/80"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Info - Compact */}
                <div className="p-2.5">
                  <h3 className="text-xs font-semibold text-ink-800 line-clamp-1 group-hover:text-brand transition-colors">
                    {brochure.title}
                  </h3>
                  {brochure.description && (
                    <p className="mt-0.5 text-[10px] text-ink-400 line-clamp-1">
                      {brochure.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewIndex !== null && (
        <BrochurePreviewModal
          brochures={brochures}
          currentIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onNavigate={(i) => setPreviewIndex(i)}
        />
      )}
    </>
  );
}
