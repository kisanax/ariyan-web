export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-100/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-ink-900">
              PT Ariyan Medika Utama
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Distributor alat kesehatan dan laboratorium berizin resmi
              Kementerian Kesehatan RI, bersertifikat CDAKB.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">Perusahaan</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li>Tentang Kami</li>
              <li>Layanan</li>
              <li>Downloads</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">Produk</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li>Laboratory</li>
              <li>BMHP</li>
              <li>Non Medical Equipment</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">Kontak</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li>(021) 89080715</li>
              <li>sales@ariyanmedikautama.com</li>
              <li>Depok, Jawa Barat</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-ink-500">
          © {new Date().getFullYear()} PT Ariyan Medika Utama. Semua hak
          dilindungi.
        </p>
      </div>
    </footer>
  );
}
