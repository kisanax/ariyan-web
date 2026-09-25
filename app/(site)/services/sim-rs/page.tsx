import type { Metadata } from "next";
import { ClipboardList, FileHeart, ReceiptText, Pill, HeartPulse, ChartNoAxesCombined, CheckCircle2, Headset, ShieldCheck } from "lucide-react";
import SoftwareServicePage from "@/components/SoftwareServicePage";

export const metadata: Metadata = {
  title: "SIM RS | PT Ariyan Medika Utama",
  description: "Sistem Informasi Manajemen Rumah Sakit untuk pendaftaran pasien, rekam medis elektronik, billing, farmasi, layanan penunjang, dan analitik.",
};

const features = [
  { title: "Pendaftaran & antrean pasien", description: "Registrasi online, antrean digital, dan bridging BPJS.", icon: ClipboardList },
  { title: "Rekam medis elektronik", description: "Catatan medis digital yang terstruktur dan terintegrasi.", icon: FileHeart },
  { title: "Billing & kasir", description: "Tagihan otomatis, klaim BPJS, dan laporan keuangan.", icon: ReceiptText },
  { title: "Farmasi & logistik", description: "Pengelolaan stok obat, resep elektronik, dan pengadaan alat kesehatan.", icon: Pill },
  { title: "Keperawatan & penunjang medis", description: "Mendukung asuhan keperawatan, radiologi, serta laboratorium LIS.", icon: HeartPulse },
  { title: "Dashboard manajemen & analitik", description: "Laporan real-time, KPI rumah sakit, dan kontrol mutu.", icon: ChartNoAxesCombined },
];

const benefits = [
  { title: "Implementasi cepat", description: "Estimasi implementasi dalam 4–8 minggu.", icon: CheckCircle2 },
  { title: "Support & training", description: "Dukungan 24/7 dan pelatihan untuk tim rumah sakit.", icon: Headset },
  { title: "Standar Kemenkes & akreditasi", description: "Mendukung kebutuhan operasional sesuai standar yang berlaku.", icon: ShieldCheck },
];

export default function SimRsPage() {
  return <SoftwareServicePage acronym="SIM RS" title="Sistem Informasi Manajemen Rumah Sakit" subtitle="Digitalisasi operasional rumah sakit yang terintegrasi dan efisien" introduction="Hubungkan pendaftaran, layanan klinis, farmasi, keuangan, dan pelaporan manajemen dalam satu sistem informasi." features={features} benefits={benefits} variant="simrs" />;
}
