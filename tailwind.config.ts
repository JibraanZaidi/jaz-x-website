import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        primary: "#6C63FF",
        secondary: "#00E5FF",
        accent: "#FF4FD8",
        card: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6C63FF, #00E5FF)",
        "gradient-accent": "linear-gradient(135deg, #6C63FF, #FF4FD8)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(108, 99, 255, 0.25)",
        "glow-cyan": "0 0 40px rgba(0, 229, 255, 0.2)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
