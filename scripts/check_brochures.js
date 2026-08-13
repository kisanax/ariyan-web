const { createClient } = require('@sanity/client');

const c = createClient({
  projectId: 'vimf3t3j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

async function main() {
  const b = await c.fetch('*[_type == "brochure"]{_id, title}');
  console.log("BROCHURES:", JSON.stringify(b, null, 2));

  const p = await c.fetch('*[_type == "product" && defined(brochure)]{_id, name, "url": brochure.asset->url}');
  console.log("PRODUCTS_WITH_OLD_BROCHURE:", JSON.stringify(p, null, 2));
}

main().catch(console.error);
