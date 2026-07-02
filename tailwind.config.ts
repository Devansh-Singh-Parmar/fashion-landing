import type { Config } from "tailwindcss";

/**
 * Placeholder brand tokens modeled on the live zineps.com identity.
 * Swap these values (and nothing else) when real brand tokens are ready,
 * see CONTENT_TODO.md.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F1FCF9",
          100: "#E6FAF5",
          200: "#DDF6F0",
          300: "#B9ECE0",
          400: "#93DDCB",
          500: "#70CAB9",
          600: "#4FAE9C",
          700: "#3B8B7D",
          800: "#2E6E64",
          900: "#26564F",
        },
        ink: {
          50: "#F7F8F8",
          100: "#EEF0F0",
          200: "#DADEDE",
          300: "#B7BFC0",
          400: "#8A9496",
          500: "#66716F",
          600: "#4C5654",
          700: "#3B4342",
          750: "#424242",
          800: "#282E2D",
          900: "#1A1A1A",
        },
        /**
         * Fashion-specific secondary accent, warm terracotta, used sparingly
         * (badges, icon backgrounds, tag pills) alongside the inherited brand teal.
         */
        clay: {
          50: "#FBF3EE",
          100: "#F6E9E2",
          200: "#EAD0C0",
          300: "#DDAF95",
          400: "#D3936D",
          500: "#C97B5A",
          600: "#A85F3C",
          700: "#8A5A3C",
          800: "#5C2D1B",
        },
        paper: "#FAF8F5",
        ink950: "#141B19",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #E6FAF5 0%, #DDF6F0 100%)",
        "brand-gradient-soft": "linear-gradient(180deg, #F1FCF9 0%, #FFFFFF 100%)",
        "hero-gradient": "radial-gradient(120% 90% at 50% -10%, #E6FAF5 0%, #EFF9F6 34%, #FAF8F5 68%)",
        "cta-gradient": "linear-gradient(135deg, #1A1A1A 0%, #1C2B27 100%)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(24, 28, 27, 0.08)",
        softer: "0 2px 12px -2px rgba(24, 28, 27, 0.06)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-a": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-b": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        marquee: "marquee 32s linear infinite",
        "float-a": "float-a 7s ease-in-out infinite",
        "float-b": "float-b 8.5s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(.4,0,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
