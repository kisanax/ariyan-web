"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

// Polyfill untuk Promise.withResolvers jika diperlukan di browser lama/mobile
if (typeof window !== "undefined" && typeof (Promise as any).withResolvers === "undefined") {
  (Promise as any).withResolvers = function () {
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
  title?: string;
}

export default function PdfThumbnail({
  fileUrl,
  alt = "PDF Preview",
  className = "",
  thumbnailUrl,
  title,
}: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Jika sudah ada thumbnail manual dari Sanity, tidak perlu proses PDF.js
    if (thumbnailUrl) return;

    if (!fileUrl) {
      setHasError(true);
      return;
    }

    let cancelled = false;

    async function renderPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");

        // Set worker yang kompatibel untuk desktop maupun mobile
        if (typeof window !== "undefined") {
          try {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
          } catch {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
          }
        }

        // Fetch PDF via ArrayBuffer (menghindari CORS di dalam worker)
        const response = await fetch(fileUrl, { mode: "cors" });
        if (!response.ok) throw new Error("Gagal mengunduh file PDF");

        const arrayBuffer = await response.arrayBuffer();
        if (cancelled) return;

        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl: "https://unpkg.com/pdfjs-dist/cmaps/",
          cMapPacked: true,
        });

        loadingTask.promise.catch((e) => {
          console.warn("PDF.js Task Warning:", e);
        });

        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        // Ukuran render optimal untuk mobile dan desktop
        const unscaledViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.min(480, (typeof window !== "undefined" ? window.innerWidth : 480));
        const scale = targetWidth / unscaledViewport.width;
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
          setRendered(true);
        }
      } catch (err) {
        console.warn("Info: Menampilkan fallback cover dokumen untuk:", title || fileUrl);
        if (!cancelled) {
          setHasError(true);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [fileUrl, thumbnailUrl, title]);

  // JIKA ADA THUMBNAIL MANUAL DARI SANITY
  if (thumbnailUrl) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <img
          src={thumbnailUrl}
          alt={alt || title || "Brosur Preview"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // JIKA TANPA THUMBNAIL MANUAL (Smart E-Catalog Document Cover + Canvas Overlay)
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-b from-[#f0f7fa] to-[#e2eff7] ${className}`}>
      {/* 1. Base Cover Visual (Selalu tampil rapi dan estetik) */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 select-none">
        {/* Top bar: Format badge & deco */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded bg-rose-500/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
            PDF
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-brand/40" />
        </div>

        {/* Middle: Document Icon & Title Graphic */}
        <div className="my-auto text-center px-1">
          <div className="mx-auto mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-brand/10 text-brand shrink-0">
            <FileText size={22} className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" strokeWidth={1.5} />
          </div>
          {title && (
            <p className="text-[10px] sm:text-[11px] font-bold text-ink-800 line-clamp-2 leading-tight">
              {title}
            </p>
          )}
          <p className="mt-1 text-[8px] sm:text-[9px] font-medium text-ink-400">
            Katalog Resmi Ariyan Medika
          </p>
        </div>

        {/* Bottom bar: Simulated document preview lines */}
        <div className="space-y-1 opacity-40">
          <div className="h-1 w-3/4 rounded bg-ink-300" />
          <div className="h-1 w-full rounded bg-ink-200" />
          <div className="h-1 w-1/2 rounded bg-ink-200" />
        </div>
      </div>

      {/* 2. Canvas PDF Auto-Render (Jika berhasil dirender di background, akan fade in mulus di atas cover) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          rendered && !hasError ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ display: "block" }}
      />
    </div>
  );
}
