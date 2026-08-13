"use client";

import { Brochure } from "@/lib/sanity";
import { useEffect, useCallback } from "react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col mx-4 max-h-[90vh] animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-white px-5 py-3 border-b border-ink-100">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-ink-900 truncate">
              {current.title}
            </h3>
            <p className="text-[11px] text-ink-400">
              {currentIndex + 1} dari {brochures.length} brosur
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a
              href={current.fileUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="relative flex-1 bg-ink-100 min-h-0">
          <iframe
            key={current.fileUrl}
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(current.fileUrl)}&embedded=true`}
            className="h-full w-full rounded-b-2xl"
            style={{ minHeight: "70vh" }}
            title={current.title}
            frameBorder="0"
          />

          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <svg className="h-5 w-5 text-ink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
            >
              <svg className="h-5 w-5 text-ink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnail Strip */}
        {brochures.length > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {brochures.map((b, i) => (
              <button
                key={b._id}
                onClick={() => onNavigate(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
