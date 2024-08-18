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
        sisal: {
          '50': '#f9f6f3',
          '100': '#f1ebe3',
          '200': '#dfd3c3', 
          '300': '#cebba3',
          '400': '#b99b7e',
          '500': '#ab8464',
          '600': '#9e7258',
          '700': '#835d4b',
          '800': '#6b4d41',
          '900': '#584036',
          '950': '#2e211c',
        },
      },
    },
  },
  plugins: [],
};
export default config;
