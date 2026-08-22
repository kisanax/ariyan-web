import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Ariyan Medika Utama | Distribusi Alat Kesehatan & Laboratorium",
  description:
    "Distributor alat kesehatan dan laboratorium terpercaya untuk rumah sakit, klinik, dan institusi pendidikan di Indonesia. Tepat Barang, Tepat Kualitas, Tepat Waktu.",
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={nunito.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
