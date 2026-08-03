import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Ariyan Medika Utama | Distribusi Alat Kesehatan & Laboratorium",
  description:
    "Distributor alat kesehatan dan laboratorium terpercaya untuk rumah sakit, klinik, dan institusi pendidikan di Indonesia. Tepat Barang, Tepat Kualitas, Tepat Waktu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="font-sans">
        <Header />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
