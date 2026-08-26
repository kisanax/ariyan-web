import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Ariyan Medika Utama",
  description: "Kebijakan privasi dan perlindungan data pengguna PT Ariyan Medika Utama.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="rounded-2xl border border-ink-900/10 bg-white p-8 shadow-sm sm:p-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Kebijakan Privasi
        </h1>
        
        <div className="prose prose-brand max-w-none text-ink-600">
          <p className="lead text-lg text-ink-500">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <p>
            Selamat datang di situs web PT Ariyan Medika Utama. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat Anda mengunjungi situs web kami.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            Saat Anda menggunakan layanan atau menghubungi kami melalui situs web ini, kami mungkin mengumpulkan beberapa informasi berikut:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Informasi Identitas:</strong> Nama lengkap, nama perusahaan, dan jabatan.</li>
            <li><strong>Informasi Kontak:</strong> Alamat email, nomor telepon, dan alamat instansi/perusahaan.</li>
            <li><strong>Pesan/Komunikasi:</strong> Rincian pertanyaan, permintaan penawaran, atau keluhan yang Anda kirimkan melalui formulir kontak atau WhatsApp.</li>
            <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, waktu akses, dan data analitik kunjungan secara anonim untuk meningkatkan kualitas website kami.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">2. Penggunaan Informasi</h2>
          <p>
            Informasi yang kami kumpulkan hanya digunakan untuk keperluan berikut:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Menanggapi pertanyaan, permintaan penawaran (quotation), atau layanan purna jual dari Anda.</li>
            <li>Memberikan informasi terkait produk alat kesehatan, laboratorium, dan layanan kami (seperti instalasi, pemeliharaan, atau kalibrasi).</li>
            <li>Meningkatkan kualitas layanan dan pengalaman pengguna di situs web kami.</li>
            <li>Keperluan administratif internal perusahaan PT Ariyan Medika Utama.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">3. Keamanan Data</h2>
          <p>
            Sebagai distributor resmi yang mematuhi standar <strong>CDAKB (Cara Distribusi Alat Kesehatan yang Baik)</strong>, kami juga menerapkan standar keamanan yang wajar untuk melindungi data pribadi Anda dari akses, pengungkapan, pengubahan, atau penghancuran yang tidak sah. Data Anda hanya dapat diakses oleh staf internal yang berwenang.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">4. Pembagian Informasi dengan Pihak Ketiga</h2>
          <p>
            Kami <strong>tidak akan</strong> menjual, menyewakan, atau menukar informasi pribadi Anda kepada pihak ketiga. Informasi Anda hanya akan dibagikan jika:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Diwajibkan oleh hukum atau permintaan dari otoritas kesehatan/pemerintah yang berwenang (misalnya Kementerian Kesehatan).</li>
            <li>Diperlukan oleh prinsipal atau produsen alat kesehatan terkait garansi, pendaftaran alat, atau penanganan komplain resmi (hanya sebatas yang diperlukan).</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">5. Tautan ke Situs Eksternal</h2>
          <p>
            Situs web kami mungkin berisi tautan ke situs prinsipal, produsen, atau platform eksternal lainnya (seperti WhatsApp). Kami tidak bertanggung jawab atas kebijakan privasi atau konten dari situs pihak ketiga tersebut. Kami menyarankan Anda untuk membaca kebijakan privasi masing-masing situs.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">6. Perubahan Kebijakan Privasi</h2>
          <p>
            PT Ariyan Medika Utama berhak memperbarui Kebijakan Privasi ini dari waktu ke waktu sesuai dengan perkembangan regulasi maupun layanan kami. Setiap perubahan akan diumumkan di halaman ini.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-ink-900">7. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau ingin memperbarui/menghapus informasi yang telah Anda berikan, silakan hubungi kami melalui:
          </p>
          <div className="mt-4 rounded-lg bg-ink-50 p-4">
            <p className="mb-1"><strong>PT Ariyan Medika Utama</strong></p>
            <p className="mb-1">Email: info@ariyanmedika.com (atau email resmi perusahaan)</p>
            <p className="mb-0">WhatsApp: +62 857-1990-6608</p>
          </div>
        </div>
      </div>
    </div>
  );
}
