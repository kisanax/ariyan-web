"use client";

import { useEffect, useRef, useState } from "react";

// Polyfill untuk Promise.withResolvers (dibutuhkan oleh pdfjs-dist versi terbaru di browser lama/mobile)
if (typeof window !== "undefined" && typeof Promise.withResolvers === "undefined") {
  // @ts-expect-error - polyfill
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

interface PdfThumbnailProps {
  fileUrl: string;
  alt?: string;
  className?: string;
  thumbnailUrl?: string;
}

export default function PdfThumbnail({ fileUrl, alt = "PDF Preview", className = "", thumbnailUrl }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(!thumbnailUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Kalau ada thumbnail manual, jangan jalankan PDF.js
    if (thumbnailUrl) return;

    if (!fileUrl) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function renderPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");

        // Gunakan unpkg yang lebih stabil (wajib HTTPS agar tidak kena blokir CORS redirect di local HTTP)
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        // Download PDF manual di main thread untuk menghindari error "Failed to fetch"/CORS di dalam Web Worker mobile
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Gagal mendownload PDF");
        
        const arrayBuffer = await response.arrayBuffer();
        if (cancelled) return;

        // Gunakan data ArrayBuffer
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        
        // Tangkap unhandled errors pada promise loadingTask
        loadingTask.promise.catch((e) => {
           console.error("PDF Loading Task Error:", e);
        });

        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const desiredWidth = 400;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = desiredWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (!context) return;

        await page.render({
          canvasContext: context,
          canvas: canvas,
          viewport,
        }).promise;

        if (!cancelled) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error rendering PDF thumbnail:", err);
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  if (hasError) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center ${className}`}>
        <div className="mb-3 rounded-2xl bg-red-50 p-4">
          <svg className="h-10 w-10 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
            <path d="M8 12h3v2H8v3h2v2H8v-2H6v-2h2v-3zm5 0h3v7h-2v-5h-1v-2z" />
          </svg>
        </div>
        <p className="text-xs font-medium text-ink-400">PDF Document</p>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Jika ada thumbnail manual dari Sanity, langsung render image */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand" />
              <p className="text-xs text-ink-400">Memuat preview...</p>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className={`h-full w-full object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
            style={{ display: "block" }}
          />
        </>
      )}
    </div>
  );
}
