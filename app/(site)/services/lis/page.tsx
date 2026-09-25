import type { Metadata } from "next";
import { Barcode, ChartNoAxesCombined, Clock3, FlaskConical, Network, ShieldCheck, Headset, CheckCircle2 } from "lucide-react";
import SoftwareServicePage from "@/components/SoftwareServicePage";

export const metadata: Metadata = {
  title: "Laboratory Information System (LIS) | PT Ariyan Medika Utama",
  description: "Solusi LIS untuk integrasi alat laboratorium, manajemen sampel barcode, validasi hasil, integrasi SIMRS dan BPJS, serta dashboard laporan.",
};

const features = [
  { title: "Integrasi alat laboratorium", description: "Koneksi otomatis ke analyzer dan peralatan laboratorium.", icon: FlaskConical },
  { title: "Manajemen sampel barcode", description: "Pelacakan sampel yang akurat dan terstruktur dengan barcode.", icon: Barcode },
  { title: "Hasil dan validasi real-time", description: "Pembaruan hasil yang cepat dengan proses validasi digital.", icon: Clock3 },
  { title: "Interfacing SIMRS & BPJS", description: "Menghubungkan alur laboratorium dengan SIMRS dan kebutuhan klaim BPJS.", icon: Network },
  { title: "Dashboard laporan", description: "Laporan lengkap dan analitik real-time untuk memantau layanan laboratorium.", icon: ChartNoAxesCombined },
];

const benefits = [
  { title: "Implementasi cepat", description: "Estimasi go-live dalam 2–4 minggu.", icon: CheckCircle2 },
  { title: "Support 24/7", description: "Tim support responsif untuk kebutuhan operasional.", icon: Headset },
  { title: "Standar Kemenkes", description: "Dirancang dengan perhatian pada regulasi dan keamanan data.", icon: ShieldCheck },
];

export default function LisPage() {
  return <SoftwareServicePage acronym="LIS" title="Laboratory Information System" subtitle="Sistem informasi laboratorium terpadu untuk rumah sakit" introduction="Kelola sampel, hasil pemeriksaan, integrasi alat, dan pelaporan laboratorium dalam satu alur kerja digital." features={features} benefits={benefits} variant="lis" />;
}
