/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayOne: '#303540',
        grayTwo: '#464652',
      },
    },
  },
  plugins: [require("daisyui")],
}

