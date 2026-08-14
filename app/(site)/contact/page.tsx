"use client";

import { useState } from "react";
import RevealSection from "@/components/RevealSection";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building2,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ── Data Kontak ── */
const CONTACT = {
  phone: "(021) 89080715",
  whatsapp: "+62 857-1990-6608",
  phoneRaw: "6285719906608",
  email: "sales@ariyanmedikautama.com",
  address:
    "Jl. Rawakalong No.59, RT.001/RW.010, Grogol, Kec. Limo, Kota Depok, Jawa Barat 16512",
  hours: "Senin – Jumat, 08:00 – 17:00 WIB",
  coverage: "Jakarta, Bogor, Depok, Tangerang, Bekasi, Jawa Barat",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d106.7925!3d-6.3848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e97c07ef96a1%3A0x0!2sJl.+Rawakalong+No.59%2C+Grogol%2C+Limo%2C+Depok!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  mapsLink: "https://maps.google.com/?q=Jl.+Rawakalong+No.59+Grogol+Limo+Depok",
  wa: (msg: string) =>
    `https://wa.me/6285719906608?text=${encodeURIComponent(msg)}`,
};

const SUBJECTS = [
  "Pemesanan Produk",
  "Konsultasi Layanan",
  "Permintaan Penawaran",
  "Kerjasama / Kemitraan",
  "Lainnya",
];

/* ── Helper: Info Card ── */
function InfoCard({
  icon,
  title,
  children,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/10">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-teal to-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/10 to-brand-teal/10 text-brand transition-colors duration-300 group-hover:from-brand group-hover:to-brand-teal group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-ink-900">{title}</h3>
      <div className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
        {children}
      </div>

      {href && cta && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          {cta}
          <ArrowRight size={14} className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Build pre-filled WhatsApp message
    const lines = [
      `Halo PT Ariyan Medika Utama 👋`,
      ``,
      `Nama: ${form.name}`,
      form.company ? `Institusi: ${form.company}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.phone ? `No. HP: ${form.phone}` : "",
      form.subject ? `Subjek: ${form.subject}` : "",
      ``,
      `Pesan:`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(CONTACT.wa(lines), "_blank");
    setSubmitted(true);
  }

  return (
    <div className="bg-[#f8fafd] min-h-screen pb-20">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-teal py-20 sm:py-28">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Geometric shapes */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.06]" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-white/[0.04]" />
          <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full border-2 border-dashed border-white/[0.08]" />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Cross motifs */}
          <svg className="absolute left-[10%] top-[20%] h-8 w-8 text-white/[0.08]" viewBox="0 0 40 40" fill="currentColor">
            <rect x="17" y="4" width="6" height="32" rx="3" />
            <rect x="4" y="17" width="32" height="6" rx="3" />
          </svg>
          <svg className="absolute right-[15%] bottom-[25%] h-10 w-10 text-white/[0.06]" viewBox="0 0 40 40" fill="currentColor">
            <rect x="17" y="4" width="6" height="32" rx="3" />
            <rect x="4" y="17" width="32" height="6" rx="3" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Kontak Kami
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            Siap Membantu{" "}
            <span className="text-white/80">Kebutuhan Alkes</span> Institusi Anda
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            Tim kami siap merespons pertanyaan, permintaan penawaran, dan konsultasi produk alat kesehatan &amp; laboratorium.
          </p>
        </div>
      </section>

      {/* ─── Contact Info Cards ─── */}
      <RevealSection className="mx-auto -mt-12 max-w-7xl px-6 lg:px-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={<MapPin size={24} className="w-6 h-6 shrink-0" />}
            title="Alamat Kantor"
            href={CONTACT.mapsLink}
            cta="Buka Google Maps"
          >
            <p>{CONTACT.address}</p>
          </InfoCard>

          <InfoCard
            icon={<Phone size={24} className="w-6 h-6 shrink-0" />}
            title="Telepon & WhatsApp"
            href={CONTACT.wa("Halo, saya ingin bertanya tentang produk Ariyan Medika")}
            cta="Chat via WhatsApp"
          >
            <p className="font-semibold text-ink-700">{CONTACT.phone}</p>
            <p className="text-xs text-ink-700 mt-1">WA: {CONTACT.whatsapp}</p>
          </InfoCard>

          <InfoCard
            icon={<Mail size={24} className="w-6 h-6 shrink-0" />}
            title="Email"
            href={`mailto:${CONTACT.email}`}
            cta="Kirim Email"
          >
            <p className="font-semibold text-ink-700">{CONTACT.email}</p>
            <p className="mt-1 text-xs text-ink-400">Respon 1×24 jam kerja</p>
          </InfoCard>

          <InfoCard
            icon={<Clock size={24} className="w-6 h-6 shrink-0" />}
            title="Jam Operasional"
          >
            <p className="font-semibold text-ink-700">{CONTACT.hours}</p>
            <p className="mt-1.5 text-xs text-ink-400">
              Area: {CONTACT.coverage}
            </p>
          </InfoCard>
        </div>
      </RevealSection>

      {/* ─── Map + Form Section ─── */}
      <RevealSection className="mx-auto mt-16 max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── Left: Map ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-ink-100 shadow-sm">
              <iframe
                src={CONTACT.mapsEmbed}
                className="h-64 w-full border-0 sm:h-80 lg:h-full lg:min-h-[480px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PT Ariyan Medika Utama"
              />
            </div>

            {/* Quick WhatsApp CTA card below map */}
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                  <MessageCircle size={22} className="w-5.5 h-5.5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink-900">
                    Butuh Respon Cepat?
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">
                    Langsung chat dengan tim sales kami via WhatsApp untuk respon instan.
                  </p>
                  <a
                    href={CONTACT.wa("Halo, saya ingin bertanya tentang produk alat kesehatan")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg active:scale-95"
                  >
                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat WhatsApp Sekarang
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 shadow-sm">
              {/* Form Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-3">
                  <Send size={12} className="w-3 h-3 shrink-0" />
                  Formulir Kontak
                </div>
                <h2 className="text-2xl font-bold text-ink-900">
                  Kirim Pesan Kepada Kami
                </h2>
                <p className="mt-2 text-sm text-ink-500">
                  Isi formulir berikut dan kami akan merespons melalui WhatsApp atau email.
                </p>
              </div>

              {submitted ? (
                /* ── Success State ── */
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <CheckCircle2 size={32} className="w-8 h-8 shrink-0" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-900">
                    Pesan Terkirim! 🎉
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-ink-500">
                    Terima kasih telah menghubungi kami. Tim kami akan merespons pesan Anda secepatnya melalui WhatsApp.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Kirim Pesan Lagi
                  </Button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Nama + Institusi */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold text-ink-700"
                      >
                        Nama Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="mb-1.5 block text-xs font-semibold text-ink-700"
                      >
                        <span className="flex items-center gap-1">
                          <Building2 size={12} className="w-3 h-3 shrink-0 text-ink-400" />
                          Institusi / Perusahaan
                        </span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Nama RS, Lab, Klinik, dll"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold text-ink-700"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@contoh.com"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="mb-1.5 block text-xs font-semibold text-ink-700"
                      >
                        No. HP / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-semibold text-ink-700"
                    >
                      Subjek <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-ink-200 bg-white px-4 py-3 pr-10 text-sm text-ink-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                      >
                        <option value="" disabled>
                          Pilih subjek pesan...
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4 shrink-0"
                      />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold text-ink-700"
                    >
                      Pesan <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tuliskan kebutuhan, pertanyaan, atau permintaan penawaran Anda..."
                      className="w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                    <p className="text-[11px] text-ink-400">
                      Pesan akan dikirim melalui WhatsApp ke tim sales kami.
                    </p>
                    <Button
                      type="submit"
                      className="h-12 gap-2 rounded-full bg-gradient-to-r from-brand to-brand-teal px-8 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/35 border-0"
                    >
                      <Send size={16} className="w-4 h-4 shrink-0" />
                      Kirim via WhatsApp
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── Bottom CTA Strip ─── */}
      <RevealSection className="mx-auto mt-20 max-w-7xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-brand to-brand-teal p-8 sm:p-12 text-center shadow-xl shadow-brand/20">
          {/* Decorative */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/[0.04]" />
          <div
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Siap untuk Berdiskusi?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              Tim profesional kami siap membantu Anda memilih produk yang tepat untuk kebutuhan institusi kesehatan Anda.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.wa("Halo, saya tertarik untuk berdiskusi mengenai produk alat kesehatan")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/50 active:scale-95"
              >
                <Mail size={18} className="w-4.5 h-4.5 shrink-0" />
                Kirim Email
              </a>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
