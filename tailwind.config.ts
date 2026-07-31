import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Diambil dari gradient logo PT Ariyan Medika Utama
        brand: {
          dark: "#0B3D6E",   // biru gelap (bagian atas logo)
          DEFAULT: "#1273B3", // biru medium
          light: "#3FA9C9",  // biru terang
          teal: "#1FB89A",   // teal/toska (bagian bawah "M")
        },
        ink: {
          900: "#0F172A",
          700: "#334155",
          500: "#64748B",
          300: "#CBD5E1",
          100: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "7rem",
      },
    },
  },
  plugins: [],
};

export default config;
