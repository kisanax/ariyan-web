"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

/* ── Custom useInView hook ── */
function useInViewOnce(
  ref: React.RefObject<HTMLElement | null>,
  margin = "-100px"
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

/* ── Data ── */
const stats = [
  {
    number: 50,
    suffix: "+",
    label: "Institusi Kesehatan",
    desc: "Rumah sakit, laboratorium & klinik yang mempercayakan kebutuhan alkes-nya pada kami.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    number: 100,
    suffix: "+",
    label: "Produk Tersedia",
    desc: "Ratusan varian alat kesehatan & lab siap dikirim ke seluruh penjuru Indonesia.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    number: 9,
    suffix: "",
    label: "Principal Resmi",
    desc: "Kerja sama langsung dengan brand ternama untuk jaminan kualitas & harga terbaik.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    number: 15,
    suffix: "+",
    label: "Tahun Pengalaman",
    desc: "Lebih dari satu dekade dedikasi dalam distribusi alat kesehatan bersertifikat.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m5.25-5.624a6.023 6.023 0 0 1-2.77.896" />
      </svg>
    ),
  },
];

const certifications: {
  code: string;
  name: string;
  desc: string;
  logo?: string;
  type: "image" | "emblem";
}[] = [
    {
      code: "CDAKB",
      name: "Cara Distribusi Alat Kesehatan yang Baik",
      desc: "Standar mutu penyimpanan & pengiriman terjamin",
      logo: "/images/certifications/cdakb.png",
      type: "image",
    },
    {
      code: "IDAK",
      name: "Izin Distribusi Alat Kesehatan",
      desc: "Legalitas distribusi resmi dari Kemenkes RI",
      type: "emblem",
    },
    {
      code: "PKP",
      name: "Penyalur Alat Kesehatan & PKRT",
      desc: "Izin penyaluran resmi alkes & perbekalan rumah tangga",
      type: "emblem",
    },
    {
      code: "LKPP",
      name: "Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah",
      desc: "Terdaftar sebagai penyedia di sistem pengadaan pemerintah",
      logo: "/images/certifications/lkpp.png",
      type: "image",
    },
    {
      code: "E-Katalog",
      name: "Katalog Elektronik Pemerintah",
      desc: "Produk tersedia di platform e-procurement nasional",
      logo: "/images/certifications/ekatalog.png",
      type: "image",
    },
    {
      code: "TKDN",
      name: "Tingkat Komponen Dalam Negeri",
      desc: "Mendukung penggunaan produk dalam negeri",
      logo: "/images/certifications/tkdn.png",
      type: "image",
    },
    {
      code: "Bangga Indonesia",
      name: "Produk Bangga Buatan Indonesia",
      desc: "Komitmen terhadap produk berkualitas karya anak bangsa",
      logo: "/images/certifications/bangga-Indo.png",
      type: "image",
    },
  ];

/* ── Emblem SVG for IDAK / PKP ── */
function CertEmblem({ code }: { code: string }) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-32 sm:w-32 lg:h-40 lg:w-40">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#emblemGrad)" strokeWidth="2.5" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#emblemGrad)" strokeWidth="1" strokeDasharray="4 3" />
        {/* Shield icon */}
        <path
          d="M50 22 C50 22 35 28 35 28 L35 45 C35 55 42 63 50 66 C58 63 65 55 65 45 L65 28 Z"
          fill="url(#emblemGrad)"
          opacity="0.12"
          stroke="url(#emblemGrad)"
          strokeWidth="1.5"
        />
        {/* Checkmark inside shield */}
        <path
          d="M43 44 L48 49 L57 38"
          fill="none"
          stroke="url(#emblemGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Text */}
        <text
          x="50"
          y="82"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#1273B3"
          letterSpacing="1"
        >
          {code}
        </text>
        {/* Gradient def */}
        <defs>
          <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1273B3" />
            <stop offset="100%" stopColor="#1FB89A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0];
  index: number;
  inView: boolean;
}) {
  const count = useCounter(stat.number, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/10">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/10 to-brand-teal/10 text-brand transition-colors duration-300 group-hover:from-brand group-hover:to-brand-teal group-hover:text-white">
          {stat.icon}
        </div>

        {/* Number */}
        <div className="mt-5 flex items-baseline gap-1">
          <span className="bg-gradient-to-r from-brand-dark via-brand to-brand-teal bg-clip-text text-5xl font-extrabold tabular-nums tracking-tight text-transparent">
            {count.toLocaleString()}
          </span>
          {stat.suffix && (
            <span className="text-3xl font-bold text-brand-teal">
              {stat.suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <h3 className="mt-3 text-lg font-semibold text-ink-900">
          {stat.label}
        </h3>

        {/* Desc */}
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7fbff] py-section"
    >
      {/* ── Background Ornaments ── */}

      {/* Top-left blob */}
      <div className="pointer-events-none absolute -left-32 -top-32">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand/[0.06] via-brand-teal/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Bottom-right blob */}
      <div className="pointer-events-none absolute -bottom-40 -right-40">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-brand-teal/[0.06] via-brand/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
          opacity: 0.25,
        }}
      />

      {/* Decorative cross/plus motifs scattered */}
      <svg className="pointer-events-none absolute left-[8%] top-[15%] h-10 w-10 text-brand/[0.08]" viewBox="0 0 40 40" fill="currentColor">
        <rect x="17" y="4" width="6" height="32" rx="3" />
        <rect x="4" y="17" width="32" height="6" rx="3" />
      </svg>
      <svg className="pointer-events-none absolute right-[12%] top-[20%] h-8 w-8 text-brand-teal/[0.1]" viewBox="0 0 40 40" fill="currentColor">
        <rect x="17" y="4" width="6" height="32" rx="3" />
        <rect x="4" y="17" width="32" height="6" rx="3" />
      </svg>
      <svg className="pointer-events-none absolute bottom-[25%] left-[15%] h-6 w-6 text-brand/[0.06]" viewBox="0 0 40 40" fill="currentColor">
        <rect x="17" y="4" width="6" height="32" rx="3" />
        <rect x="4" y="17" width="32" height="6" rx="3" />
      </svg>
      <svg className="pointer-events-none absolute bottom-[15%] right-[8%] h-12 w-12 text-brand-teal/[0.07]" viewBox="0 0 40 40" fill="currentColor">
        <rect x="17" y="4" width="6" height="32" rx="3" />
        <rect x="4" y="17" width="32" height="6" rx="3" />
      </svg>

      {/* Circle ring decorations */}
      <div className="pointer-events-none absolute right-[5%] top-[10%] h-24 w-24 rounded-full border-2 border-dashed border-brand/[0.06]" />
      <div className="pointer-events-none absolute bottom-[20%] left-[5%] h-32 w-32 rounded-full border-2 border-dashed border-brand-teal/[0.06]" />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Keunggulan Kami
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-ink-900 lg:text-5xl">
            Bukan sekadar distributor.{" "}
            <span className="inline-block bg-gradient-to-r from-brand via-brand-teal to-brand bg-clip-text text-transparent">
              Mitra strategis
            </span>{" "}
            untuk institusi kesehatan Anda.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            Setiap produk yang kami kirim telah melalui standar distribusi ketat
            — karena dalam dunia kesehatan, tidak ada ruang untuk kompromi.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Divider */}
        <div className="mx-auto my-20 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-ink-200 to-transparent" />

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
            Legalitas & Sertifikasi
          </p>
          <h3 className="mx-auto mt-5 max-w-2xl text-2xl font-bold tracking-tight text-ink-900 lg:text-3xl">
            Terdaftar & tersertifikasi oleh Kementerian Kesehatan RI
          </h3>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-ink-100 bg-white px-4 py-6 sm:px-5 sm:py-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/10"
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-teal to-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Logo or Emblem */}
              {cert.type === "image" && cert.logo ? (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-32 sm:w-32 lg:h-40 lg:w-40">
                  <Image
                    src={cert.logo}
                    alt={cert.code}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <CertEmblem code={cert.code} />
              )}

              {/* Name */}
              <p className="mt-5 text-sm sm:text-base font-bold text-ink-900">
                {cert.code}
              </p>

              {/* Full name */}
              <p className="mt-1 text-xs sm:text-sm font-medium text-brand">
                {cert.name}
              </p>

              {/* Desc */}
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-500">
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="https://wa.me/6285719906608?text=Halo%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20PT%20Ariyan%20Medika%20Utama"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-brand to-brand-teal px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/35"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hubungi Kami Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
