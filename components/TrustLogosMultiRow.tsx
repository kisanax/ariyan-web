// ===== GANTI ISI LOGO/NAMA DI SINI =====
// Tiap baris punya arah beda (kiri/kanan). Kalau nanti punya logo asli,
// ganti <span> jadi <Image> kayak di LogoMarquee.tsx.

const row1 = [
  "RS Pelabuhan Ratu",
  "RSUD Cilincing",
  "RSUD Kota Bogor",
  "RSUD Sayang",
  "RSUD Tanjung Priok",
  "RSUP dr. Sitanala",
];

const row2 = [
  "Lab Klinik Duta Medika",
  "Lab Klinik Ratna Lisa",
  "Universitas Pendidikan Indonesia",
  "Universitas Kristen Indonesia",
  "Badan Narkotika Nasional",
  "Komisi Pemberantasan Koruppsi",
];

const row3 = [
  "Dinkes Kab. Sumedang",
  "Dinkes Kab. Bandung",
  "Labkesda Prov. Kalsel",
  "Puskesmas Cilandak",
  "Puskesmas Menteng",
  "PT Equilab International",
  "PT Trisula Delta Medika",
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