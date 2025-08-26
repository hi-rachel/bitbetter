import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5",
          foreground: "#ffffff",
        },
        background: "#f8fafc",
      },
      animation: {
        "gradient-x": "gradient-x 2s ease-in-out infinite",
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        aurora: {
          from: {
            "background-position": "50% 50%, 50% 50%",
          },
          to: {
            "background-position": "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
