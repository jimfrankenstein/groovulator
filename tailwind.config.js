/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        fugaz: ["var(--font-fugaz)", "cursive"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
