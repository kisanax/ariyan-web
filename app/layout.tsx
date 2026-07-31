import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="id" className={inter.variable}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
