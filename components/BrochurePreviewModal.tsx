"use client";

import ShareButton from "@/components/ShareButton";
import { Brochure } from "@/lib/sanity";
import { useEffect, useCallback, useState } from "react";
import {
  Download,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Smartphone,
  Eye,
} from "lucide-react";

interface BrochurePreviewModalProps {
  brochures: Brochure[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function BrochurePreviewModal({
  brochures,
  currentIndex,
  onClose,
  onNavigate,
}: BrochurePreviewModalProps) {
  const current = brochures[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < brochures.length - 1;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, handlePrev, handleNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!current) return null;

  // We construct a fully qualified URL for sharing if it's a relative path, but Sanity urls are already absolute.
  const shareUrl = current.fileUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content Box */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col h-[92vh] sm:h-[88vh] rounded-2xl bg-white shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-3.5 py-3 sm:px-6 sm:py-3.5 border-b border-ink-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
              <FileText size={18} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base font-bold text-ink-900 truncate">
                {current.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-ink-400">
                Brosur {currentIndex + 1} dari {brochures.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden sm:block">
              <ShareButton 
                title={current.title} 
                text={`Lihat brosur ${current.title} dari Ariyan Medika Utama:`} 
                url={shareUrl}
              />
            </div>
            
            {/* Open in new tab / Fullscreen */}
            <a
              href={current.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-700 shadow-sm transition-colors hover:bg-ink-50 active:scale-95 shrink-0 h-[34px] sm:h-[38px]"
              title="Buka PDF di tab baru"
            >
              <ExternalLink size={14} className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Layar Penuh</span>
            </a>

            {/* Download button */}
            <a
              href={current.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-dark active:scale-95 shrink-0"
            >
              <Download size={14} className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Unduh</span>
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700 active:scale-95 ml-0.5 shrink-0"
              aria-label="Tutup preview"
            >
              <X size={20} className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Mobile Action Bar (Sangat berguna di HP) */}
        <div className="flex sm:hidden items-center justify-between bg-blue-50/90 px-3.5 py-2 text-xs text-brand border-b border-blue-100">
          <span className="flex items-center gap-1.5 text-ink-700 truncate font-medium">
            <Smartphone size={14} className="w-3.5 h-3.5 shrink-0 text-brand" />
            Tampilan Dokumen PDF
          </span>
          <div className="flex items-center gap-2">
            <div className="scale-90 origin-right">
              <ShareButton 
                title={current.title} 
                text={`Lihat brosur ${current.title} dari Ariyan Medika Utama:`} 
                url={shareUrl}
              />
            </div>
            <a
              href={current.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-xs bg-brand text-white px-2.5 py-1.5 rounded-md shadow-xs active:scale-95 shrink-0"
            >
              <Eye size={12} className="w-3 h-3 shrink-0" />
              Buka PDF ↗
            </a>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="relative flex-1 bg-slate-100 min-h-0 w-full overflow-hidden flex flex-col">
          <iframe
            key={current.fileUrl}
            src={`${current.fileUrl}#toolbar=1&navpanes=0&view=FitH`}
            className="h-full w-full border-0 bg-white"
            title={current.title}
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Desktop/Tablet Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-ink-700 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95 hover:text-brand border border-ink-100 z-10"
              aria-label="Brosur sebelumnya"
            >
              <ChevronLeft size={20} className="w-5 h-5 shrink-0" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-ink-700 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95 hover:text-brand border border-ink-100 z-10"
              aria-label="Brosur berikutnya"
            >
              <ChevronRight size={20} className="w-5 h-5 shrink-0" />
            </button>
          )}
        </div>

        {/* Bottom Bar: Indicators & Mobile Prev/Next Controls */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-ink-100 shrink-0">
          {/* Mobile Prev */}
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              hasPrev ? "text-ink-700 bg-ink-100 active:scale-95" : "text-ink-300 opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={16} className="w-4 h-4 shrink-0" />
            Prev
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mx-auto">
            {brochures.map((b, i) => (
              <button
                key={b._id}
                onClick={() => onNavigate(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-brand"
                    : "w-2 bg-ink-200 hover:bg-ink-300"
                }`}
                aria-label={`Lihat brosur ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Next */}
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              hasNext ? "text-ink-700 bg-ink-100 active:scale-95" : "text-ink-300 opacity-40 cursor-not-allowed"
            }`}
          >
            Next
            <ChevronRight size={16} className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
