import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ash: "#8A8A8E",
        smoke: "#1A1A1C",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 8vw, 7rem)",
          { lineHeight: "1.03", letterSpacing: "-0.035em" },
        ],
        "section-title": [
          "clamp(2rem, 5vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
      },
      spacing: {
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
