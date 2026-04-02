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
          primary: '#4F46E5',
          secondary: '#7C3AED',
          accent: '#10B981',
          warm: '#F59E0B',
          cyan: '#06B6D4',
          bg: '#FAFBFF',
          surface: '#FFFFFF',
          text: '#1E1B4B',
          muted: '#64748B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
