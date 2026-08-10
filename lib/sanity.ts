import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vimf3t3j",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// --- Types ---
export type Product = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  brandLogo?: any;
  principal: string;
  principalLogo?: any;
  image: any;
  gallery: any[];
  shortDescription: string;
  specifications: string[];
  applications: string[];
  brochureUrl?: string;
};

// --- Queries ---

export async function getProducts({
  category,
  brand,
  principal,
  searchQuery,
  sort,
}: {
  category?: string;
  brand?: string;
  principal?: string;
  searchQuery?: string;
  sort?: string;
}): Promise<Product[]> {
  const filterConditions = [`_type == "product"`];

  if (category) {
    filterConditions.push(`category->name == "${category}"`);
  }
  if (brand) {
    filterConditions.push(`brand->name == "${brand}"`);
  }
  if (principal) {
    filterConditions.push(`principal->name == "${principal}"`);
  }
  if (searchQuery) {
    filterConditions.push(`name match "*${searchQuery}*"`);
  }

  let orderClause = "";
  if (sort === "name-asc") {
    orderClause = " | order(name asc)";
  } else if (sort === "name-desc") {
    orderClause = " | order(name desc)";
  } else {
    orderClause = " | order(_createdAt desc)";
  }

  const query = `*[${filterConditions.join(" && ")}]${orderClause} {
    _id,
    "slug": slug.current,
    name,
    "category": category->name,
    "brand": brand->name,
    "brandLogo": brand->logo,
    "principal": principal->name,
    "principalLogo": principal->logo,
    "image": gallery[0],
    shortDescription
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 30 } }); // Revalidate every 30s
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    "category": category->name,
    "brand": brand->name,
    "brandLogo": brand->logo,
    "principal": principal->name,
    "principalLogo": principal->logo,
    gallery,
    "image": gallery[0],
    shortDescription,
    specifications,
    features,
    applications,
    "brochureUrl": brochure.asset->url
  }`;

  return await client.fetch(query, { slug }, { next: { revalidate: 30 } });
}

export async function getCategories(): Promise<string[]> {
  const query = `*[_type == "category"] | order(name asc) { name }`;
  const result = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return result.map((c: any) => c.name);
}

export async function getBrands(): Promise<string[]> {
  const query = `*[_type == "brand"] | order(name asc) { name }`;
  const result = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return result.map((b: any) => b.name);
}

export type Principal = {
  name: string;
  logo: string;
};

export async function getPrincipals(): Promise<Principal[]> {
  const query = `*[_type == "principal"] | order(name asc) { name, "logo": logo.asset->url }`;
  return await client.fetch(query, {}, { next: { revalidate: 30 } });
}
