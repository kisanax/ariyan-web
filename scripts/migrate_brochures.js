/**
 * Script migrasi: Pindahkan data brosur lama (field di produk) ke schema brochure baru
 * 
 * Langkah:
 * 1. Ambil semua produk yang punya field brochure lama
 * 2. Buat dokumen brochure baru untuk tiap file PDF
 * 3. Update produk: set field brochures[] dengan reference ke brochure baru
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'vimf3t3j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Must use false for mutations
  token: process.env.SANITY_TOKEN, // Butuh write token
});

async function migrate() {
  console.log('🔍 Mencari produk dengan brosur lama...\n');

  const products = await client.fetch(`
    *[_type == "product" && defined(brochure)] {
      _id,
      name,
      brochure
    }
  `);

  if (products.length === 0) {
    console.log('✅ Tidak ada data brosur lama yang perlu dimigrasi.');
    return;
  }

  console.log(`📦 Ditemukan ${products.length} produk dengan brosur lama:\n`);
  products.forEach((p, i) => console.log(`  ${i + 1}. ${p.name}`));
  console.log('');

  for (const product of products) {
    const brochureTitle = `Brosur - ${product.name}`;
    console.log(`⏳ Migrasi: "${brochureTitle}"...`);

    // 1. Buat dokumen brochure baru, reuse asset yang sama
    const brochureDoc = await client.create({
      _type: 'brochure',
      title: brochureTitle,
      description: `Brosur produk ${product.name}`,
      file: product.brochure, // Reuse asset reference yang sama
    });

    console.log(`   ✅ Brochure created: ${brochureDoc._id}`);

    // 2. Update produk: tambah reference ke brochure baru
    await client
      .patch(product._id)
      .set({
        brochures: [{ _type: 'reference', _ref: brochureDoc._id, _key: brochureDoc._id.slice(0, 12) }],
      })
      .commit();

    console.log(`   ✅ Product updated: ${product.name}\n`);
  }

  console.log('🎉 Migrasi selesai! Semua brosur sudah dipindahkan ke schema baru.');
  console.log('\n⚠️  Catatan: Field brochure lama masih ada di produk.');
  console.log('   Kamu bisa menghapusnya nanti setelah verifikasi.');
}

migrate().catch(console.error);
