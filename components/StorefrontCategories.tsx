"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Beaker, 
  Stethoscope, 
  Syringe, 
  Activity, 
  Microscope, 
  Package, 
  Pill, 
  Heart 
} from "lucide-react";

export default function StorefrontCategories({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  // Fungsi helper untuk memilih icon berdasarkan nama kategori
  const getIconForCategory = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("reagen") || lowerName.includes("kimia")) return <Beaker size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    if (lowerName.includes("alat") || lowerName.includes("equipment") || lowerName.includes("instrument")) return <Stethoscope size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    if (lowerName.includes("bmhp") || lowerName.includes("habis pakai") || lowerName.includes("disposable")) return <Syringe size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    if (lowerName.includes("lab") || lowerName.includes("mikroskop")) return <Microscope size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    if (lowerName.includes("obat") || lowerName.includes("farmasi")) return <Pill size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    if (lowerName.includes("diagnostik") || lowerName.includes("diagnostic")) return <Activity size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />;
    return <Package size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />; // Default
  };

  return (
    <div className="w-full overflow-hidden my-4">
      <div className="flex gap-2.5 sm:gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 px-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        
        {/* Tombol 'Semua' */}
        <Link 
          href="/produk" 
          className={`flex flex-col items-center justify-center min-w-[90px] sm:min-w-[105px] h-[95px] sm:h-[105px] rounded-2xl border transition-all snap-start shadow-xs p-2 ${
            !currentCategory 
              ? "border-brand bg-brand/5 ring-1 ring-brand/20" 
              : "border-ink-100 bg-white hover:border-brand/30 hover:bg-ink-50 hover:-translate-y-0.5"
          }`}
        >
          <div className={`mb-2 flex items-center justify-center shrink-0 ${!currentCategory ? "text-brand" : "text-ink-300"}`}>
            <Heart size={28} className="w-7 h-7 shrink-0" strokeWidth={1.5} />
          </div>
          <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight line-clamp-1 ${!currentCategory ? "text-brand" : "text-ink-600"}`}>
            Semua
          </span>
        </Link>

        {/* Daftar Kategori */}
        {categories.map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <Link 
              key={cat} 
              href={`/produk?category=${encodeURIComponent(cat)}`}
              className={`flex flex-col items-center justify-center min-w-[90px] sm:min-w-[105px] h-[95px] sm:h-[105px] rounded-2xl border transition-all snap-start shadow-xs p-2 ${
                isActive 
                  ? "border-brand bg-brand/5 ring-1 ring-brand/20" 
                  : "border-ink-100 bg-white hover:border-brand/30 hover:bg-ink-50 hover:-translate-y-0.5"
              }`}
            >
              <div className={`mb-2 flex items-center justify-center shrink-0 ${isActive ? "text-brand" : "text-[#70b9df]"}`}>
                {getIconForCategory(cat)}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-semibold text-center leading-tight px-1 line-clamp-2 ${isActive ? "text-brand" : "text-ink-600"}`}>
                {cat}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
