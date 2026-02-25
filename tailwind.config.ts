import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        charcoal: {
          DEFAULT: "#1a1a18",
          50: "#f5f5f3",
          100: "#e8e8e4",
          200: "#d0d0c8",
          300: "#a8a89e",
          400: "#7a7a70",
          500: "#5a5a52",
          600: "#3e3e38",
          700: "#2e2e28",
          800: "#1a1a18",
          900: "#0f0f0e",
        },
        offwhite: "#f8f7f4",
        terracotta: {
          DEFAULT: "#c4724a",
          light: "#d4927a",
          dark: "#a05538",
        },
        river: {
          DEFAULT: "#4a7fa0",
          light: "#6a9fbc",
          dark: "#2e5f7e",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-in": "slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        grain: "grain 0.3s steps(1) infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(1%, -1%)" },
          "70%": { transform: "translate(-2%, 3%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-1%, 1%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
