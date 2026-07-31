import { defineField, defineType } from "sanity";

export default defineType({
  name: "principal",
  title: "Principal",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Principal", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
  ],
});
