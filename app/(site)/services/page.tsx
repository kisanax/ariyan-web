"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Wrench,
  Gauge,
  Settings,
  GraduationCap,
  Package,
  Check,
  MessageCircle,
  ShieldCheck,
  MapPin,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealSection from "@/components/RevealSection";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA TYPES & CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Category =
  | "lab-instrument"
  | "medical-device"
  | "analyzer"
  | "radiology"
  | "aesthetic"
  | "preventive"
  | "instalasi"
  | "sparepart";

interface ServiceCategory {
  id: Category;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

interface ServiceItem {
  id: string;
  code: string;
  category: Category;
  name: string;
  price: number;
}

const WA_NUMBER = "6285719906608";

const CATEGORIES: ServiceCategory[] = [
  {
    id: "lab-instrument",
    label: "Instrumen Laboratorium",
    icon: Gauge,
    description:
      "Kalibrasi & pengujian alat laboratorium seperti centrifuge, mikropipet, timbangan, autoclave, dan peralatan lab lainnya.",
    color: "bg-blue-50 text-brand border-blue-200",
  },
  {
    id: "medical-device",
    label: "Alat Medis & Monitoring",
    icon: Settings,
    description:
      "Kalibrasi alat medis meliputi bedside monitor, infuse pump, syringe pump, defibrilator, ventilator, dan peralatan medis lainnya.",
    color: "bg-teal-50 text-brand-teal border-teal-200",
  },
  {
    id: "analyzer",
    label: "Analyzer Laboratorium",
    icon: Gauge,
    description:
      "Kalibrasi kelistrikan analyzer hematology, chemistry, immunology, urinalysis, coagulating, dan analyzer khusus lainnya.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "radiology",
    label: "Radiologi & Imaging",
    icon: Wrench,
    description:
      "Pengujian & kalibrasi peralatan radiologi termasuk X-Ray, fluoroscopy, USG, echocardiograph, dan pesawat UKES.",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "aesthetic",
    label: "Alat Estetika & Kecantikan",
    icon: Sparkles,
    description:
      "Kalibrasi kelistrikan alat estetika: Exilis, Laser CO2, RF Slimming, IPL, HIFU, Pico Laser, dan lainnya.",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    id: "preventive",
    label: "Preventive & Corrective Maintenance",
    icon: Settings,
    description:
      "Perawatan berkala dan perbaikan terencana untuk menjaga performa optimal alat kesehatan & laboratorium Anda.",
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "instalasi",
    label: "Instalasi & Training Alat",
    icon: GraduationCap,
    description:
      "Instalasi profesional dan pelatihan operator untuk memastikan alat berfungsi optimal sejak hari pertama.",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "sparepart",
    label: "Support Spare Part",
    icon: Package,
    description:
      "Ketersediaan suku cadang original dan kompatibel untuk berbagai merek alat kesehatan & laboratorium.",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
];

/* ── Kategori auto-assign berdasarkan nama item ── */
function assignCategory(name: string): Category {
  const n = name.toLowerCase();

  // Aesthetic devices
  if (
    n.includes("exilis") ||
    n.includes("laser co2") ||
    n.includes("rf slimming") ||
    n.includes("high frequency") ||
    n.includes("hydra facial") ||
    n.includes("pollogen") ||
    n.includes("intense pulse") ||
    n.includes("ipl") ||
    n.includes("hifu") ||
    n.includes("high-intensity focused") ||
    n.includes("photodynamic") ||
    n.includes("biolight") ||
    n.includes("pico laser")
  )
    return "aesthetic";

  // Radiology & Imaging
  if (
    n.includes("x-ray") ||
    n.includes("fluoroscopy") ||
    n.includes("ukes") ||
    n.includes("dental oral") ||
    n.includes("dental panoramic") ||
    n.includes("ultrasonography") ||
    n.includes("usg") ||
    n.includes("echocardiograph")
  )
    return "radiology";

  // Analyzers
  if (
    n.includes("analyzer") ||
    n.includes("photometer") ||
    n.includes("vitek") ||
    n.includes("bactalert") ||
    n.includes("colony counter") ||
    n.includes("tissue processing") ||
    n.includes("real time pcr")
  )
    return "analyzer";

  // Medical devices
  if (
    n.includes("anestesi") ||
    n.includes("anesthesi") ||
    n.includes("ventilator") ||
    n.includes("bedside monitor") ||
    n.includes("defibrilator") ||
    n.includes("aed") ||
    n.includes("cpap") ||
    n.includes("neopuff") ||
    n.includes("infuse pump") ||
    n.includes("syringe pump") ||
    n.includes("ekg") ||
    n.includes("electrosurgical") ||
    n.includes("electrostimulator") ||
    n.includes("fetal doppler") ||
    n.includes("cardiotocograph") ||
    n.includes("spo2") ||
    n.includes("pulse oximeter") ||
    n.includes("nibp") ||
    n.includes("tensimeter") ||
    n.includes("sphygmomanometer") ||
    n.includes("spirometer") ||
    n.includes("suction") ||
    n.includes("oxygen concentrator") ||
    n.includes("flow meter") ||
    n.includes("nebulizer") ||
    n.includes("baby incubator") ||
    n.includes("infant warmer") ||
    n.includes("blood warmer") ||
    n.includes("blood bank") ||
    n.includes("hemodialisa") ||
    n.includes("lampu") ||
    n.includes("light curing") ||
    n.includes("phototherapy") ||
    n.includes("dental unit") ||
    n.includes("ent treatment") ||
    n.includes("stress test") ||
    n.includes("treadmill") ||
    n.includes("audiometri") ||
    n.includes("stature meter") ||
    n.includes("mistar")
  )
    return "medical-device";

  // Lab instruments (default)
  return "lab-instrument";
}

/* ── Data Pricelist Resmi dari Excel Elvakal Lab ── */
const PRICELIST_RAW: [string, string, number][] = [
  ["KP0001", "Air Sampler", 3850000],
  ["KP0002", "Mikropipet Fixed", 480000],
  ["KP0003", "Mikropipet Variable", 550000],
  ["KP0004", "Mikropipet Multichannel-8", 1100000],
  ["KP0139", "Mikropipet Multichannel-12", 1500000],
  ["KP0005", "Thermohygrometer", 740000],
  ["KP0006", "Anestesi Unit", 770000],
  ["KP0008", "Anesthesi + Ventilator", 1210000],
  ["KP0010", "Audiometri", 1000000],
  ["KP0011", "Autoclave", 630000],
  ["KP0012", "Baby Incubator", 715000],
  ["KP0013", "Baby Incubator Transport", 715000],
  ["KP0014", "Bedside Monitor", 700000],
  ["KP0015", "Biosafety Cabinet (BSC)", 4500000],
  ["KP0016", "Blood Bank Refrigerator", 740000],
  ["KP0017", "Blood Gas Analyzer (Electricity)", 500000],
  ["KP0018", "Blood Warmer", 740000],
  ["KP0019", "Cardiotocograph", 400000],
  ["KP0021", "Centrifuge", 350000],
  ["KP0022", "Centrifuge Refrigerator", 550000],
  ["KP0023", "Chemistry Analyzer (Electricity)", 500000],
  ["KP0024", "Climatic Chamber", 740000],
  ["KP0025", "Coagulating Analyzer (Electricity)", 500000],
  ["KP0026", "Cold Chain", 740000],
  ["KP0027", "CPAP", 770000],
  ["KP0028", "Cryostat", 1100000],
  ["KP0031", "Data Logger", 740000],
  ["KP0032", "Defibrilator / AED", 750000],
  ["KP0033", "Defibrilator with Monitor", 750000],
  ["KP0034", "Dental Oral", 1250000],
  ["KP0035", "Dental Panoramic", 1500000],
  ["KP0036", "Dental Unit", 450000],
  ["KP0037", "Echocardiograph", 470000],
  ["KP0038", "EKG", 470000],
  ["KP0039", "Electrosurgical Unit", 680000],
  ["KP0040", "Electrolyte Analyzer (Electricity)", 500000],
  ["KP0041", "Electrostimulator", 500000],
  ["KP0043", "ENT Treatment", 420000],
  ["KP0044", "Fetal Doppler", 400000],
  ["KP0045", "Flow Meter Oksigen", 550000],
  ["KP0046", "Fluoroscopy", 1750000],
  ["KP0047", "HbA1C Analyzer (Electricity)", 500000],
  ["KP0049", "Hematology Analyzer (Electricity)", 500000],
  ["KP0050", "Hemodialisa", 1850000],
  ["KP0051", "Hot Plate", 740000],
  ["KP0052", "Immunology Analyzer (Electricity)", 500000],
  ["KP0053", "Incubator Laboratorium", 740000],
  ["KP0054", "Infant Warmer", 600000],
  ["KP0055", "Infuse Pump", 550000],
  ["KP0056", "Laminar Air Flow (LAF)", 4500000],
  ["KP0057", "Lampu Operasi", 440000],
  ["KP0058", "Lampu Pemeriksaan", 440000],
  ["KP0059", "Lampu UV Phototherapy", 420000],
  ["KP0060", "Light Curing", 440000],
  ["KP0062", "Medical Freezer", 740000],
  ["KP0063", "Medical Refrigerator", 740000],
  ["KP0065", "Microscope", 600000],
  ["KP0066", "Nebulizer", 400000],
  ["KP0067", "NeoPuff", 770000],
  ["KP0068", "NIBP / Tensimeter Digital", 350000],
  ["KP0070", "Oven", 740000],
  ["KP0071", "Oxygen Concentrator", 550000],
  ["KP0072", "Parafin Bath", 740000],
  ["KP0073", "Parafin Dispenser", 740000],
  ["KP0075", "Photometer (Electricity)", 500000],
  ["KP0076", "Real Time PCR", 1240000],
  ["KP0078", "Refrigerator / Showcase / Chiller / Freezer", 740000],
  ["KP0079", "Rotator", 350000],
  ["KP0080", "Shaker", 350000],
  ["KP0081", "Sphygmomanometer", 350000],
  ["KP0082", "Spirometer", 400000],
  ["KP0083", "SPO2 / Pulse Oximeter", 350000],
  ["KP0084", "Stature Meter / Mistar", 460000],
  ["KP0085", "Sterilisasi Kering", 740000],
  ["KP0086", "Stirrer", 350000],
  ["KP0087", "Stress Test (Treadmill + ECG + NIBP)", 600000],
  ["KP0088", "Suction Pump", 355000],
  ["KP0089", "Suction Wall", 355000],
  ["KP0090", "Syringe Pump", 550000],
  ["KP0091", "Thermometer Infrared / Ear", 740000],
  ["KP0092", "Thermometer Klinik", 740000],
  ["KP0093", "Thermometer Kulkas", 740000],
  ["KP0094", "Timbangan Bayi", 360000],
  ["KP0095", "Timbangan Bayi + Stature Meter", 550000],
  ["KP0097", "Timbangan Dewasa", 400000],
  ["KP0098", "Timbangan Dewasa + Stature Meter", 600000],
  ["KP0099", "Timbangan Barang (Maks. 110 Kg)", 400000],
  ["KP0100", "Timer", 250000],
  ["KP0101", "Tissue Processing (Electricity)", 500000],
  ["KP0102", "Treadmill", 460000],
  ["KP0103", "UKES Pesawat Radiologi Umum", 7750000],
  ["KP0104", "Ultrasonography 3D", 600000],
  ["KP0105", "Hot Plate Stirrer", 818000],
  ["KP0106", "Urine Analyzer (Electricity)", 500000],
  ["KP0107", "USG", 600000],
  ["KP0108", "Ventilator", 770000],
  ["KP0109", "Ventilator Transport", 770000],
  ["KP0110", "Vitek 2 Compact (Electrical only)", 500000],
  ["KP0141", "Vitek 2 Compact (Electricity + Suhu)", 1240000],
  ["KP0142", "Vitek 2 Compact (Electrical) & Accessories (Suhu & Volume)", 2200000],
  ["KP0143", "BactAlert (Electrical only)", 500000],
  ["KP0144", "BactAlert (Electricity + Suhu)", 1240000],
  ["KP0111", "Water Bath", 740000],
  ["KP0112", "X-ray General Purpose", 1750000],
  ["KP0113", "X-ray Mobile", 1750000],
  ["KP0114", "Dry Bath", 740000],
  ["KP0115", "Mini Centrifuge", 350000],
  ["KP0116", "Vortex", 350000],
  ["KP0117", "Vaccine Storage", 740000],
  ["KP0118", "Hybridizer PCR", 740000],
  ["KP0119", "Thermal Cycler PCR", 740000],
  ["KP0120", "Kelistrikan", 500000],
  ["KP0121", "Fume Hood / Lemari Asam", 4000000],
  ["KP0122", "Embedding Center", 1100000],
  ["KP0123", "Shaking Incubator", 915000],
  ["KP0124", "Multipipet", 550000],
  ["KP0125", "Dispenserpipet", 550000],
  ["KP0126", "Mastercycler PCR", 740000],
  ["KP0127", "Thermometer Tusuk", 740000],
  ["KP0128", "Thermometer Digital", 740000],
  ["KP0129", "Exilis (Electrical only)", 500000],
  ["KP0130", "Laser CO2 (Electrical only)", 500000],
  ["KP0131", "RF Slimming Machine (Electrical only)", 500000],
  ["KP0132", "High Frequency (Electrical only)", 500000],
  ["KP0133", "Hydra Facial (Electrical only)", 500000],
  ["KP0134", "Pollogen (Electrical only)", 500000],
  ["KP0135", "Intense Pulse Light / IPL (Electrical only)", 500000],
  ["KP0136", "High-Intensity Focused Ultrasound / HIFU (Electrical only)", 500000],
  ["KP0137", "Photodynamic Therapy / Biolight (Electrical only)", 500000],
  ["KP0138", "Pico Laser (Electrical only)", 500000],
  ["KP0140", "Colony Counter (Electrical only)", 500000],
];

const SERVICE_ITEMS: ServiceItem[] = PRICELIST_RAW.map(([code, name, price]) => ({
  id: code,
  code,
  category: assignCategory(name),
  name,
  price,
}));

type FilterId = Category | "all";

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "lab-instrument", label: "Lab Instrumen" },
  { id: "medical-device", label: "Alat Medis" },
  { id: "analyzer", label: "Analyzer" },
  { id: "radiology", label: "Radiologi" },
  { id: "aesthetic", label: "Estetika" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function buildWhatsAppUrl(selected: ServiceItem[]): string {
  const lines = selected.map(
    (item, i) => `${i + 1}. ${item.name} (${item.code}) — ${formatRupiah(item.price)}`
  );
  const total = selected.reduce((sum, i) => sum + i.price, 0);

  const message = `Halo PT Ariyan Medika Utama,

Saya ingin mengajukan permintaan penawaran (RFQ) untuk layanan kalibrasi & pengujian berikut:

${lines.join("\n")}

Total Estimasi: ${formatRupiah(total)}
*Belum termasuk PPN 11%

Mohon informasi lebih lanjut mengenai ketersediaan jadwal dan detail biaya.
Terima kasih.`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  // Inisialisasi: semua kategori tertutup secara default
  const [openCategories, setOpenCategories] = useState<Set<Category>>(new Set());
  const pricelistRef = useRef<HTMLDivElement>(null);

  /* ── Derived ── */
  const filteredItems = useMemo(() => {
    let items = SERVICE_ITEMS;
    if (activeFilter !== "all") {
      items = items.filter((item) => item.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeFilter, searchQuery]);

  // Group filtered items per category
  const groupedCategories = useMemo(() => {
    const list: { category: ServiceCategory; items: ServiceItem[] }[] = [];
    CATEGORIES.forEach((cat) => {
      const itemsInCat = filteredItems.filter((item) => item.category === cat.id);
      if (itemsInCat.length > 0) {
        list.push({ category: cat, items: itemsInCat });
      }
    });
    return list;
  }, [filteredItems]);

  // Auto-expand categories hanya jika user sedang mencari atau memilih filter kategori tertentu
  useEffect(() => {
    if (searchQuery.trim() || activeFilter !== "all") {
      setOpenCategories(new Set(groupedCategories.map((g) => g.category.id)));
    }
  }, [searchQuery, activeFilter, groupedCategories]);

  const selectedItems = useMemo(
    () => SERVICE_ITEMS.filter((item) => selectedIds.has(item.id)),
    [selectedIds]
  );

  const totalEstimate = useMemo(
    () => selectedItems.reduce((sum, i) => sum + i.price, 0),
    [selectedItems]
  );

  /* ── Handlers ── */
  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCategory(catId: Category) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  }

  function expandAll() {
    setOpenCategories(new Set(CATEGORIES.map((c) => c.id)));
  }

  function collapseAll() {
    setOpenCategories(new Set());
  }

  function handleCategoryClick(catId: Category) {
    setActiveFilter(catId);
    setOpenCategories((prev) => new Set([...Array.from(prev), catId]));
    pricelistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  return (
    <div className="relative">
      {/* ─── 1. HERO BANNER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-teal py-24 sm:py-32 lg:py-40">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Layanan Profesional Bersertifikat
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Jasa Service, Kalibrasi<br className="hidden sm:block" /> &amp; Pengujian Alat Kesehatan
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed">
            Layanan kalibrasi dan pengujian alat laboratorium &amp; kesehatan
            oleh teknisi bersertifikat dengan standar <strong className="text-white">CDAKB Kemenkes RI</strong>.
            Pilih layanan yang Anda butuhkan dan kirim RFQ langsung via WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-white/90 shadow-lg shadow-black/10 font-bold"
              onClick={() => pricelistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              Lihat Daftar Harga
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand font-bold shadow-lg transition-all"
            >
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya ingin berkonsultasi mengenai layanan service & kalibrasi alat kesehatan.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Konsultasi Gratis
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 2. SERVICE CATEGORIES ─── */}
      <RevealSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Layanan Kami
              </h2>
              <p className="mt-3 text-ink-500 max-w-2xl mx-auto">
                Solusi lengkap untuk kebutuhan kalibrasi, pengujian, perawatan, dan service
                alat kesehatan &amp; laboratorium Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cat.color}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-ink-900 leading-tight">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-xs text-ink-500 leading-relaxed">
                      {cat.description}
                    </p>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand group-hover:underline">
                      Lihat Pricelist
                      <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── 3. PRICELIST / KATALOG ─── */}
      <section
        ref={pricelistRef}
        className="scroll-mt-28 py-20 sm:py-24 bg-ink-100/40"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Daftar Harga Layanan Kalibrasi &amp; Pengujian
            </h2>
            <p className="mt-3 text-ink-500 max-w-2xl mx-auto">
              Pilih layanan yang Anda butuhkan, lalu kirim permintaan penawaran (RFQ) langsung via WhatsApp.
              Harga belum termasuk PPN 11%.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
              <input
                type="text"
                placeholder="Cari alat (nama atau kode)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-ink-300/60 bg-white pl-10 pr-10 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    activeFilter === tab.id
                      ? "bg-brand text-white shadow-md shadow-brand/20"
                      : "bg-white text-ink-700 hover:bg-ink-100 border border-ink-300/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-ink-500">
              Menampilkan <strong className="text-ink-900">{filteredItems.length}</strong> item di{" "}
              <strong className="text-ink-900">{groupedCategories.length}</strong> kategori
              {selectedIds.size > 0 && (
                <> · <strong className="text-brand">{selectedIds.size} dipilih</strong></>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="text-xs font-semibold text-brand hover:underline px-2 py-1"
              >
                Buka Semua
              </button>
              <span className="text-xs text-ink-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-xs font-semibold text-ink-500 hover:underline px-2 py-1"
              >
                Tutup Semua
              </button>
            </div>
          </div>

          {/* Grouped Category Collapsibles */}
          {groupedCategories.length === 0 ? (
            <div className="rounded-2xl border border-ink-300/40 bg-white px-6 py-16 text-center text-ink-500 shadow-sm">
              <Search className="mx-auto h-8 w-8 mb-3 text-ink-300" />
              <p className="font-semibold">Tidak ditemukan</p>
              <p className="text-sm mt-1">Coba ubah kata kunci pencarian atau filter kategori.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {groupedCategories.map((group) => {
                const isOpen = openCategories.has(group.category.id);
                const Icon = group.category.icon;
                const selectedInGroupCount = group.items.filter((i) => selectedIds.has(i.id)).length;

                return (
                  <div
                    key={group.category.id}
                    className="rounded-2xl border border-ink-300/50 bg-white overflow-hidden shadow-sm transition-all duration-200"
                  >
                    {/* Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(group.category.id)}
                      className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-ink-100/40 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-ink-900">
                              {group.category.label}
                            </h3>
                            <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-700">
                              {group.items.length} item
                            </span>
                            {selectedInGroupCount > 0 && (
                              <span className="rounded-full bg-brand/10 text-brand px-2.5 py-0.5 text-xs font-bold">
                                {selectedInGroupCount} dipilih
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                            {group.category.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-4">
                        <span className="text-xs font-medium text-ink-500 hidden sm:inline">
                          {isOpen ? "Sembunyikan" : "Tampilkan"}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-ink-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-brand" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Collapsible Body */}
                    {isOpen && (
                      <div className="border-t border-ink-100">
                        {/* Table Header inside Accordion */}
                        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-2.5 bg-ink-100/50 border-b border-ink-100 text-xs font-bold text-ink-500 uppercase tracking-wider">
                          <span>Nama Layanan & Kode</span>
                          <span className="w-36 text-right">Harga Satuan</span>
                          <span className="w-16 text-center">Pilih</span>
                        </div>

                        {/* Item Rows */}
                        <div className="divide-y divide-ink-100">
                          {group.items.map((item) => {
                            const isSelected = selectedIds.has(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleItem(item.id)}
                                className={`w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-4 items-center px-6 py-3.5 text-left transition-colors ${
                                  isSelected ? "bg-brand/5" : "hover:bg-ink-100/40"
                                }`}
                              >
                                {/* Name + Code */}
                                <div className="flex flex-col pr-2">
                                  <span className="text-sm font-semibold text-ink-900 leading-snug">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-ink-500 mt-0.5">
                                    Kode: <span className="font-mono">{item.code}</span>
                                  </span>
                                </div>

                                {/* Price */}
                                <span className="w-36 text-sm font-bold text-brand text-left sm:text-right">
                                  {formatRupiah(item.price)}
                                </span>

                                {/* Checkbox */}
                                <div className="w-16 flex justify-start sm:justify-center">
                                  <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                      isSelected
                                        ? "border-brand bg-brand text-white scale-110"
                                        : "border-ink-300 bg-white"
                                    }`}
                                  >
                                    {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Notes */}
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
            <strong>Catatan:</strong>
            <ol className="list-decimal ml-4 mt-1 space-y-0.5">
              <li>Harga belum termasuk PPN 11%.</li>
              <li>Harga layanan kalibrasi belum termasuk biaya pengiriman (PP) UUT dari pelanggan ke Lab. Kalibrasi, apabila pekerjaan dilakukan di lab.</li>
              <li>Harga belum termasuk biaya akomodasi petugas kalibrasi jika pekerjaan dilakukan di fasilitas pelanggan.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ─── 4. TRUST & CTA SECTION ─── */}
      <RevealSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Mengapa Mempercayakan Service kepada Kami?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Bersertifikat CDAKB",
                  desc: "Sertifikasi resmi dari Kemenkes RI untuk Cara Distribusi Alat Kesehatan yang Baik.",
                },
                {
                  icon: Wrench,
                  title: "Teknisi Berpengalaman",
                  desc: "Tim engineer terlatih dengan pengalaman menangani berbagai merek alat lab & kesehatan.",
                },
                {
                  icon: MapPin,
                  title: "Coverage Jabodetabek & Jabar",
                  desc: "Jangkauan layanan meliputi Jakarta, Bogor, Depok, Tangerang, Bekasi, dan Jawa Barat.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center text-center rounded-2xl border border-ink-100 bg-ink-100/30 p-8"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                      <Icon className="h-7 w-7 text-brand" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Final CTA */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-dark via-brand to-brand-teal p-10 sm:p-14 text-center">
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                Butuh Bantuan Service atau Kalibrasi?
              </h3>
              <p className="mt-3 text-white/80 max-w-xl mx-auto">
                Tim kami siap membantu Anda. Konsultasikan kebutuhan service alat kesehatan &amp; laboratorium Anda
                secara gratis melalui WhatsApp.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand hover:bg-white/90 shadow-lg"
                >
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya ingin berkonsultasi mengenai layanan service & kalibrasi alat kesehatan.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand font-bold shadow-lg transition-all"
                >
                  <a href="tel:02189080715">
                    Telepon: (021) 89080715
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── 5. FLOATING RFQ SUMMARY BAR ─── */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-brand/20 bg-white/95 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-12">
            {/* Left: Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-xs font-bold">
                  {selectedItems.length}
                </span>
                <span className="text-sm font-semibold text-ink-900">
                  item dipilih
                </span>
              </div>
              <span className="text-sm text-ink-500 hidden sm:inline">•</span>
              <span className="text-sm font-bold text-brand">
                Est. {formatRupiah(totalEstimate)}
                <span className="text-xs font-normal text-ink-500 ml-1">+PPN</span>
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-xs font-medium text-ink-500 hover:text-ink-900 underline underline-offset-2 transition-colors"
              >
                Reset
              </button>
              <Button asChild size="default" className="shadow-md shadow-brand/20">
                <a
                  href={buildWhatsAppUrl(selectedItems)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim RFQ via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer when floating bar is visible */}
      {selectedItems.length > 0 && <div className="h-20" />}
    </div>
  );
}
