import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        garage: {
          black: "#1d1d1f",
          blue: "#0071e3",
          darkblue: "#0058b0",
          gray: "#86868b",
          light: "#f5f5f7",
          border: "#d2d2d7",
          warm: "#FF9F0A",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.04)",
        hover: "0 10px 30px rgba(0,0,0,0.08)",
        dock: "0 20px 40px -10px rgba(0,0,0,0.15)",
        glow: "0 0 20px rgba(0, 113, 227, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
