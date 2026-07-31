import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Kategori", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "parent", title: "Induk Kategori (opsional)", type: "reference", to: [{ type: "category" }] }),
  ],
});
