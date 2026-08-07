import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "PT Ariyan Medika Utama",

  // Ganti dengan Project ID & dataset kamu sendiri dari sanity.io/manage
  projectId: "vimf3t3j",
  dataset: "production",
  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
