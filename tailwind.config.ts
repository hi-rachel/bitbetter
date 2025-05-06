import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5", // indigo-600
          foreground: "#ffffff",
        },
        background: "#f8fafc", // slate-50
      },
    },
  },
  plugins: [],
};
export default config;
