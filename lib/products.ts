export type Product = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  principal: string;
  image: string;
  shortDescription: string;
  specifications: string[];
  applications: string[];
};

export const categories = [
  "Hematology",
  "Clinical Chemistry",
  "Immunology",
  "Urinalysis",
  "Microbiology",
  "POCT",
  "Centrifuge",
  "Laboratory Accessories",
  "BMHP",
  "Non Medical Equipment",
  "General Supplies",
];

export const brands = ["OneMed", "Arkan Medical", "Becton Dickinson", "KomitKami"];

export const principals = [
  "Enseval Medika Prima",
  "Enseval Putera Megatrading",
  "PT ITS Science Indonesia",
  "PT Zenix Zea Putra",
];

// Data contoh — nanti sumber ini diganti query ke Sanity CMS
export const products: Product[] = [
  {
    slug: "vacutainer-tube-5ml",
    name: "Vacutainer Tube 5ml EDTA",
    category: "Hematology",
    brand: "Becton Dickinson",
    principal: "Enseval Medika Prima",
    image: "/images/placeholder-product.svg",
    shortDescription:
      "Tabung vakum untuk pengambilan sampel darah dengan antikoagulan EDTA K2.",
    specifications: ["Volume: 5ml", "Material: PET", "Additive: EDTA K2"],
    applications: ["Pemeriksaan hematologi rutin", "Cross-matching darah"],
  },
  {
    slug: "pot-urine-steril",
    name: "Pot Urine Steril 60ml",
    category: "Urinalysis",
    brand: "OneMed",
    principal: "PT Zenix Zea Putra",
    image: "/images/placeholder-product.svg",
    shortDescription:
      "Wadah steril sekali pakai untuk penampungan sampel urine pasien.",
    specifications: ["Volume: 60ml", "Steril, sekali pakai"],
    applications: ["Pemeriksaan urinalisis", "Kultur urine"],
  },
  {
    slug: "centrifuge-benchtop",
    name: "Centrifuge Benchtop 12 Holes",
    category: "Centrifuge",
    brand: "Arkan Medical",
    principal: "PT ITS Science Indonesia",
    image: "/images/placeholder-product.svg",
    shortDescription:
      "Sentrifuse meja dengan kapasitas 12 lubang untuk kebutuhan laboratorium klinik.",
    specifications: ["Kapasitas: 12 tabung", "Kecepatan maks: 4000 rpm"],
    applications: ["Pemisahan serum/plasma", "Preparasi sampel"],
  },
];
