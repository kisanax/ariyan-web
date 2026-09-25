import type { ElementType } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type SoftwareFeature = {
  title: string;
  description: string;
  icon: ElementType;
};

type Props = {
  acronym: string;
  title: string;
  subtitle: string;
  introduction: string;
  features: SoftwareFeature[];
  benefits: { title: string; description: string; icon: ElementType }[];
  variant: "lis" | "simrs";
};

export default function SoftwareServicePage({
  acronym,
  title,
  subtitle,
  introduction,
  features,
  benefits,
  variant,
}: Props) {
  const isLis = variant === "lis";
  const accent = isLis ? "text-cyan-300" : "text-amber-300";
  const badge = isLis
    ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
    : "border-amber-300/30 bg-amber-300/10 text-amber-200";
  const featureIcon = isLis
    ? "bg-sky-50 text-sky-700"
    : "bg-amber-50 text-amber-700";

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative isolate bg-[#0d3260] px-5 pb-20 pt-24 text-white sm:px-8 sm:pt-28 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 26%, rgba(0,177,202,.5), transparent 25%), radial-gradient(circle at 88% 76%, rgba(39,108,183,.65), transparent 30%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-white/70">
              Layanan <span aria-hidden="true">/</span> {acronym}
            </div>
            <div className={`mb-6 inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] ${badge}`}>
              Solusi digital rumah sakit
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className={accent}>{acronym}</span>
              <span className="mt-3 block">{title}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold text-white/90 sm:text-xl">
              {subtitle}
            </p>
            <p className="mt-4 max-w-xl leading-7 text-white/70">{introduction}</p>
            <a
              href={`https://wa.me/6285719906608?text=${encodeURIComponent(`Halo PT Ariyan Medika Utama, saya ingin konsultasi mengenai solusi ${acronym}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-[#0d3260] shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isLis ? "bg-cyan-300 hover:bg-cyan-200" : "bg-amber-300 hover:bg-amber-200"}`}
            >
              Konsultasikan {acronym} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
            <div className="absolute -inset-5 rounded-[2.5rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-sm sm:p-9">
              <div className="flex items-center justify-between border-b border-white/20 pb-5">
                <span className="text-xs font-bold uppercase tracking-[.2em] text-white/60">Ariyan Medika Utama</span>
                <span className={`rounded-lg px-3 py-1 text-sm font-extrabold ${isLis ? "bg-cyan-300 text-[#0d3260]" : "bg-amber-300 text-[#0d3260]"}`}>{acronym}</span>
              </div>
              <div className="space-y-3 pt-6">
                {features.slice(0, 3).map(({ title: featureTitle, icon: Icon }) => (
                  <div key={featureTitle} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 px-4 py-4">
                    <Icon className={`h-6 w-6 shrink-0 ${accent}`} strokeWidth={1.8} />
                    <span className="font-semibold leading-snug">{featureTitle}</span>
                    <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-white/50" />
                  </div>
                ))}
              </div>
              <div className="mt-6 h-1 rounded-full bg-white/10">
                <div className={`h-full w-3/4 rounded-full ${isLis ? "bg-cyan-300" : "bg-amber-300"}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className={`text-sm font-extrabold uppercase tracking-[.18em] ${isLis ? "text-sky-700" : "text-amber-700"}`}>
              Fitur utama
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#12345a] sm:text-4xl">
              {isLis ? "Alur laboratorium yang saling terhubung" : "Operasional rumah sakit dalam satu sistem"}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title: featureTitle, description, icon: Icon }) => (
              <article key={featureTitle} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${featureIcon}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-[#12345a]">{featureTitle}</h3>
                <p className="mt-2 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-[#12345a] sm:text-3xl">Dukungan untuk implementasi</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {benefits.map(({ title: benefitTitle, description, icon: Icon }) => (
              <div key={benefitTitle} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <Icon className={`mt-1 h-6 w-6 shrink-0 ${isLis ? "text-sky-700" : "text-amber-600"}`} strokeWidth={1.8} />
                <div>
                  <h3 className="font-bold text-[#12345a]">{benefitTitle}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-[#0d3260] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-white/60">Hubungi kami</p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Diskusikan kebutuhan {acronym} Anda</h2>
            <p className="mt-2 text-white/70">Tim kami siap membantu memilih solusi sesuai alur kerja fasilitas Anda.</p>
          </div>
          <a
            href={`https://wa.me/6285719906608?text=${encodeURIComponent(`Halo PT Ariyan Medika Utama, saya ingin konsultasi mengenai solusi ${acronym}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 font-bold text-[#0d3260] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isLis ? "bg-cyan-300 hover:bg-cyan-200" : "bg-amber-300 hover:bg-amber-200"}`}
          >
            Hubungi via WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
