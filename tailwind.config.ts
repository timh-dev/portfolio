import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(35 23% 88%)",
        input: "hsl(35 23% 88%)",
        ring: "hsl(205 82% 45%)",
        background: "hsl(40 22% 96%)",
        foreground: "hsl(224 26% 15%)",
        primary: {
          DEFAULT: "hsl(218 42% 16%)",
          foreground: "hsl(40 22% 96%)",
        },
        secondary: {
          DEFAULT: "hsl(40 20% 92%)",
          foreground: "hsl(224 26% 20%)",
        },
        muted: {
          DEFAULT: "hsl(38 18% 93%)",
          foreground: "hsl(219 14% 43%)",
        },
        accent: {
          DEFAULT: "hsl(30 70% 55%)",
          foreground: "hsl(224 26% 15%)",
        },
        card: {
          DEFAULT: "hsla(0 0% 100% / 0.72)",
          foreground: "hsl(224 26% 15%)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 24px 80px -32px rgba(24, 35, 58, 0.24)",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "sans-serif"],
        serif: ["Cormorant Garamond", "ui-serif", "serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(223, 193, 147, 0.24), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.58))",
      },
    },
  },
  plugins: [],
} satisfies Config;
