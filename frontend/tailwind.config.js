/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glysa: ["Glysa", "sans-serif"],
        lexenddeca: ["Lexend-Deca", "sans-serif"]
      },
    },
  },
  plugins: [],
};
