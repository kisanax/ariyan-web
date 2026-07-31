import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produk",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Produk",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "principal",
      title: "Principal",
      type: "reference",
      to: [{ type: "principal" }],
    }),
    defineField({
      name: "gallery",
      title: "Galeri Foto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "shortDescription",
      title: "Deskripsi Singkat",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "specifications",
      title: "Spesifikasi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      title: "Fitur",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applications",
      title: "Aplikasi / Penggunaan",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "brochure",
      title: "Brosur (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "relatedProducts",
      title: "Produk Terkait",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: { title: "name", media: "gallery.0" },
  },
});
