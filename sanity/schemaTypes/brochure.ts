import { defineField, defineType } from "sanity";

export default defineType({
  name: "brochure",
  title: "Brosur",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "title",
      title: "Judul Brosur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "file",
      title: "File PDF",
      type: "file",
      options: { accept: ".pdf" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail / Cover (Opsional)",
      type: "image",
      options: { hotspot: true },
      description: "Opsional. Jika tidak diisi, thumbnail otomatis diambil dari halaman pertama PDF.",
    }),
  ],
  preview: {
    select: { title: "title", media: "thumbnail" },
  },
});
