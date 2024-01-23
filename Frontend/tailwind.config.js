/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT( {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      container: {
        center: true, 
      }
    }
  },
  plugins: [],
  
})