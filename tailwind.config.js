/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins'  : ['Poppins', 'sans-serif']
      },
      shadow: {
        'normal': '-2px 5px 20px 0px #0000001A', // box-shadow: -2px 5px 20px 0px #0000001A;
      }
    },
  },
  plugins: [],
}
