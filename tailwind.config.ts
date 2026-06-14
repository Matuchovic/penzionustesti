import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E8",
        "warm-beige": "#EFE7DA",
        sandstone: "#D7C3A4",
        gold: "#B89A6A",
        "dark-forest": "#0F241D",
        "deep-moss": "#183128",
        text: "#1D1D1D",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
