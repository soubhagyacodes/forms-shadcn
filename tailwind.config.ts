import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // No extensions, using Tailwind’s default theme
  },
  plugins: [],
};

export default config;
