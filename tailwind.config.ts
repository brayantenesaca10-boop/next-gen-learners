import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',   // Authority/Institutional
          teal: '#0D9488',   // Innovation/AI
          accent: '#F59E0B', // Action/Buttons
          light: '#F8FAFC',  // Clean background
        },
      },
    },
  },
  plugins: [],
};
export default config;