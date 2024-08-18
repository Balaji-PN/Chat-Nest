import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        backgroundLight: "#f4f4f5", // Example for a softer light mode background
        backgroundDark: "#121212", // Example for a slightly darker dark mode background
      },
    },
  },
  plugins: [],
};
export default config;
