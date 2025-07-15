/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    colors: {
      primary: "#1b2430",
      accent: "#17cf97",
      brand: "#6C63FF",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    boxShadow: {
      subtle: "0 5px 15px rgba(0, 0, 0, 0.06)",
    },
  },
},

};
