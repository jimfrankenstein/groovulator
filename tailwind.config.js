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
      colors: {
        groovulator: {
          black: "#000000",
          blue: "#0004FF",
          green: "#7EFF00",
          pink: "#FF00D5",
        },
        taxidermia: {
          blue: "#4fc6e0",
          green: "#a4cd39",
          "green-dark": "#74aa4e",
          pink: "#d22f92",
          orange: "#e77724",
          yellow: "#fbe300",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
