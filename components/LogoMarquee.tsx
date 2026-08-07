import Image from "next/image";

// ===== GANTI LOGO DI SINI =====
// Cukup ganti file di public/images/partners/ dengan nama yang sama,
// atau ubah path "src" di bawah kalau nama file logo asli kamu beda.
const partners = [
  { name: "Enseval Medika Prima", src: "/images/partners/emp.png" },
  { name: "OneMed", src: "/images/partners/onemed.png" },
  { name: "Arkan Medical", src: "/images/partners/arkan-medical.png" },
  { name: "Becton Dickinson", src: "/images/partners/bd.png" },
  { name: "KomitKami", src: "/images/partners/komitkami.png" },
  { name: "Labcare", src: "/images/partners/labcare.png" },
  { name: "Nusa Plus", src: "/images/partners/nusa-plus.png" },
  { name: "Sansico", src: "/images/partners/sansico.png" },
  { name: "Virtue", src: "/images/partners/virtue.png" },
];

export default function LogoMarquee() {
  // Logo di-duplikat 1x biar looping-nya mulus tanpa "patah"
  const items = [...partners, ...partners];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-16 sm:gap-24">
        {items.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-16 w-32 sm:h-20 sm:w-40 shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={240}
              height={120}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}