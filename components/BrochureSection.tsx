"use client";

import { useState } from "react";
import { Brochure, urlFor } from "@/lib/sanity";
import PdfThumbnail from "@/components/PdfThumbnail";
import BrochurePreviewModal from "@/components/BrochurePreviewModal";
import { Eye, Download, FileText, ArrowDownToLine } from "lucide-react";

export default function BrochureSection({ brochures }: { brochures: Brochure[] }) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (!brochures || brochures.length === 0) return null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        {/* Framed Container */}
        <div className="rounded-3xl border border-ink-100/80 bg-white p-6 md:p-10 shadow-sm">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-3">
              <ArrowDownToLine size={14} className="w-3.5 h-3.5 shrink-0" />
              E-Catalog &amp; Brosur Resmi
            </div>
            <h2 className="text-2xl font-bold text-ink-900 md:text-3xl">
              Katalog &amp; Brosur Produk
            </h2>
            <p className="mt-2 text-sm text-ink-500 max-w-lg mx-auto">
              Unduh atau tinjau langsung katalog dan brosur produk untuk informasi lengkap spesifikasi teknis dan fitur alat.
            </p>
          </div>

          {/* Brochure Cards Grid */}
          <div className="mx-auto max-w-5xl grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {brochures.map((brochure, index) => (
              <div
                key={brochure._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand/40 hover:-translate-y-1"
              >
                {/* PDF Thumbnail / Cover */}
                <div
                  onClick={() => setPreviewIndex(index)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50 cursor-pointer"
                >
                  <PdfThumbnail
                    fileUrl={brochure.fileUrl}
                    alt={brochure.title}
                    title={brochure.title}
                    thumbnailUrl={brochure.thumbnail ? urlFor(brochure.thumbnail).url() : undefined}
                  />

                  {/* Desktop Hover Action Overlay */}
                  <div className="absolute inset-0 hidden sm:flex items-center justify-center bg-ink-950/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                    <div className="flex flex-col gap-2 px-3 w-full max-w-[140px] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewIndex(index);
                        }}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-ink-800 shadow-md transition-transform hover:scale-105 hover:bg-brand hover:text-white"
                      >
                        <Eye size={14} className="w-3.5 h-3.5 shrink-0" />
                        Preview
                      </button>
                      <a
                        href={brochure.fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-brand-dark"
                      >
                        <Download size={14} className="w-3.5 h-3.5 shrink-0" />
                        Unduh
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3 flex-1 flex flex-col justify-between bg-white border-t border-ink-100/60">
                  <div>
                    <h3 className="text-xs font-bold text-ink-900 line-clamp-2 group-hover:text-brand transition-colors">
                      {brochure.title}
                    </h3>
                    {brochure.description && (
                      <p className="mt-1 text-[11px] text-ink-400 line-clamp-1">
                        {brochure.description}
                      </p>
                    )}
                  </div>

                  {/* Mobile Quick Action Buttons */}
                  <div className="mt-2.5 flex sm:hidden items-center gap-1.5 pt-2 border-t border-ink-100">
                    <button
                      type="button"
                      onClick={() => setPreviewIndex(index)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-ink-50 py-1.5 text-[10px] font-semibold text-ink-700 hover:bg-ink-100 active:scale-95"
                    >
                      <Eye size={12} className="w-3 h-3 shrink-0" />
                      Preview
                    </button>
                    <a
                      href={brochure.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-brand/10 py-1.5 text-[10px] font-semibold text-brand hover:bg-brand hover:text-white active:scale-95"
                    >
                      <Download size={12} className="w-3 h-3 shrink-0" />
                      Unduh
                    </a>
                  </div>
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
