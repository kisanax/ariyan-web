import Image from "next/image";

// ===== GANTI LOGO DI SINI =====
// Cukup ganti file di public/images/partners/ dengan nama yang sama,
// atau ubah path "src" di bawah kalau nama file logo asli kamu beda.
const partners = [
  { name: "Enseval Medika Prima", src: "/images/partners/enseval-medika.svg" },
  { name: "OneMed", src: "/images/partners/onemed.svg" },
  { name: "Arkan Medical", src: "/images/partners/arkan-medical.svg" },
  { name: "Becton Dickinson", src: "/images/partners/becton-dickinson.svg" },
  { name: "KomitKami", src: "/images/partners/komitkami.svg" },
];

export default function LogoMarquee() {
  // Logo di-duplikat 1x biar looping-nya mulus tanpa "patah"
  const items = [...partners, ...partners];

  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-16">
        {items.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex shrink-0 items-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={160}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}