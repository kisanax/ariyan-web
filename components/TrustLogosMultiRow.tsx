// ===== GANTI ISI LOGO/NAMA DI SINI =====
// Tiap baris punya arah beda (kiri/kanan). Kalau nanti punya logo asli,
// ganti <span> jadi <Image> kayak di LogoMarquee.tsx.

const row1 = [
  "Alam Rezeki Raya",
  "Badan Narkotika Nasional",
  "CV Bona Sukses",
  "Dinas Kesehatan Kota Serang",
  "Dutagraha Afiah (RS Ummi)",
  "Kedutaan Besar Australia",
  "Kementrian Kehutanan Sekretariat Jenderal",
  "Klinik 24Jam Virja Medika",
  "Klinik Bamed",
  "Klinik Pratama Mubina Medical Center",
  "Komisi Pemberantasan Korupsi RI",
  "Laboratorium Klinik Ratna Lisa",
  "Politeknik Kesehatan Jakarta III",
  "PT Amanda Medika Alkesindo",
  "PT Baswara Jaya Scientific",
  "PT Burhan Sejahtera Mulia",
  "PT Cess Lab Indonesia",
  "PT Dexa Arfindo",
  "PT Dimas Love Medika",
  "PT Genomik Solidaritas Indonesia",
  "PT Gentra Banteuka Nusantara",
  "PT Kurnia Abadi Mandiri",
  "PT Medika Selaras",
  "PT Mutiara Jaya Medika",
  "PT Salur Medika Utama",
];

const row2 = [
  "PT Sekar Anugrah Mandiri",
  "PT Siloam Clinic Utama",
  "PT Teras Sejahtera Tehnik",
  "PT Virtue Diagnostics Indonesia",
  "PT. Enseval Medika Prima",
  "PT. Equilab International",
  "PT. Era Mitra Perdana",
  "PT. Innocreative",
  "PT. Katalis Datesa Prima",
  "PT. Kenakai Makmur Alkesindo",
  "PT. Zenix Zea Putra",
  "Puskesmas Kec. Kebayoran Lama",
  "Puskesmas Menteng",
  "Puskesmas Batujajar",
  "Puskesmas Cihampelas",
  "Puskesmas Cilandak",
  "Puskesmas Darmaraja Sumedang",
  "Puskesmas Jagakarsa",
  "Puskesmas Karangrayung II",
  "Puskesmas Pulo Gadung",
  "Puskesmas Sumedang Selatan",
  "Puskesmas Tanjung Priok",
  "RS Assalam",
  "RS Azra",
  "RS Borneo Citra Medika",
];

const row3 = [
  "RS Jantung Binawaluya",
  "RS Sentra Medika Cibinong",
  "RS UIN Syarif Hidayatullah Jakarta",
  "RS Umum Adhyaksa Jakarta",
  "RS Umum Patria IKKT",
  "RSUD Cilincing",
  "RSUD Cimacan",
  "RSUD Jatisari",
  "RSUD Kebayoran Lama",
  "RSUD KH Mansyur",
  "RSUD Koja",
  "RSUD Meuraxa",
  "RSUD Tamansari",
  "RSUD Tarakan Jakarta",
  "RSUP DR Sitanala Tangerang",
  "RS Bhayangkara Banda Aceh",
  "RS LNG Badak",
  "RS Permata Bekasi",
  "RSUD Pelabuhanratu Kab. Sukabumi",
  "RS Pengayoman Cipinang Kelas D",
  "Sekretariat Jenderal DPR RI",
  "Tiara Agung Pratama",
  "Unit Donor Darah PMI Jakarta",
  "Yay. Universitas Kristen Indonesia",
  "Yayasan Kanker Indonesia",
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {doubled.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className="shrink-0 whitespace-nowrap rounded-xl border border-ink-100 bg-ink-100/40 px-6 py-4 text-sm font-semibold text-ink-700 transition-all hover:bg-white hover:text-brand hover:shadow-md"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustLogosMultiRow() {
  return (
    <div className="flex flex-col gap-4">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
      <MarqueeRow items={row3} direction="left" />
    </div>
  );
}