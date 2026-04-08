// Tailwind v4 config — theme customization goes in CSS via @theme directive
// See: src/styles/tokens.css
// Content detection is automatic in v4, but listed explicitly for clarity.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
