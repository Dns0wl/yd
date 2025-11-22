import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#111111",
        accent: "#f5f5f5",
      },
      boxShadow: {
        subtle: "0 10px 35px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
