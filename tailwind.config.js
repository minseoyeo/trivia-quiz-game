/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#8a15d9",
        "black-primary-200": "#222",
        "black-primary-300": "#333",
        "purple-blue": "#5372f0",
        "gray": "#6c757d"
      },
      fontFamily: {
        merriweather: ["Merriwather", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  },
  plugins: [],
}

