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
        sans: ["var(--font-body)", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Instrument Sans", "var(--font-body)", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        garage: {
          canvas: "rgb(var(--garage-canvas) / <alpha-value>)",
          surface: "rgb(var(--garage-surface) / <alpha-value>)",
          panel: "rgb(var(--garage-panel) / <alpha-value>)",
          black: "rgb(var(--garage-ink-strong) / <alpha-value>)",
          ink: "rgb(var(--garage-ink) / <alpha-value>)",
          gray: "rgb(var(--garage-ink-muted) / <alpha-value>)",
          border: "rgb(var(--garage-border) / <alpha-value>)",
          blue: "rgb(var(--garage-blue) / <alpha-value>)",
          lilac: "rgb(var(--garage-lilac) / <alpha-value>)",
          lilacSoft: "rgb(var(--garage-lilac-soft) / <alpha-value>)",
          light: "rgb(var(--garage-light) / <alpha-value>)",
          warm: "rgb(var(--garage-warm) / <alpha-value>)",
          heroDark: "rgb(var(--garage-hero-dark) / <alpha-value>)",
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        xl2: "1.25rem",
        "2.5xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 16, 26, 0.06)",
        hover: "0 20px 45px rgba(15, 16, 26, 0.1)",
        dock: "0 24px 60px rgba(16, 12, 34, 0.14)",
        lilac: "0 10px 35px rgba(165, 147, 255, 0.25)",
      },
      backgroundImage: {
        "lilac-wash": "radial-gradient(circle at top right, rgba(197, 183, 255, 0.34), transparent 52%)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
