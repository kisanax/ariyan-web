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
    if (lowerName.includes("reagen") || lowerName.includes("kimia")) return <Beaker className="w-8 h-8" strokeWidth={1.5} />;
    if (lowerName.includes("alat") || lowerName.includes("equipment") || lowerName.includes("instrument")) return <Stethoscope className="w-8 h-8" strokeWidth={1.5} />;
    if (lowerName.includes("bmhp") || lowerName.includes("habis pakai") || lowerName.includes("disposable")) return <Syringe className="w-8 h-8" strokeWidth={1.5} />;
    if (lowerName.includes("lab") || lowerName.includes("mikroskop")) return <Microscope className="w-8 h-8" strokeWidth={1.5} />;
    if (lowerName.includes("obat") || lowerName.includes("farmasi")) return <Pill className="w-8 h-8" strokeWidth={1.5} />;
    if (lowerName.includes("diagnostik") || lowerName.includes("diagnostic")) return <Activity className="w-8 h-8" strokeWidth={1.5} />;
    return <Package className="w-8 h-8" strokeWidth={1.5} />; // Default
  };

  return (
    <div className="w-full overflow-hidden mt-8 mb-8">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 lg:mx-0 lg:px-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        
        {/* Tombol 'Semua' */}
        <Link 
          href="/produk" 
          className={`flex flex-col items-center justify-center min-w-[110px] h-[110px] rounded-2xl border transition-all snap-start shadow-sm ${
            !currentCategory 
              ? "border-brand bg-brand/5 ring-1 ring-brand/20" 
              : "border-ink-100 bg-white hover:border-brand/30 hover:bg-ink-50 hover:-translate-y-1"
          }`}
        >
          <div className={`mb-3 ${!currentCategory ? "text-brand" : "text-ink-300"}`}>
            <Heart className="w-9 h-9" strokeWidth={1.5} />
          </div>
          <span className={`text-xs font-semibold text-center leading-tight ${!currentCategory ? "text-brand" : "text-ink-600"}`}>
            Semua Produk
          </span>
        </Link>

        {/* Daftar Kategori */}
        {categories.map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <Link 
              key={cat}
              href={`/produk?category=${encodeURIComponent(cat)}`}
              className={`flex flex-col items-center justify-center min-w-[110px] h-[110px] rounded-2xl border transition-all snap-start shadow-sm ${
                isActive 
                  ? "border-brand bg-brand/5 ring-1 ring-brand/20" 
                  : "border-ink-100 bg-white hover:border-brand/30 hover:bg-ink-50 hover:-translate-y-1"
              }`}
            >
              <div className={`mb-3 ${isActive ? "text-brand" : "text-[#70b9df]"}`}>
                {getIconForCategory(cat)}
              </div>
              <span className={`text-[11px] font-semibold text-center leading-tight px-2 ${isActive ? "text-brand" : "text-ink-600"}`}>
                {cat}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
