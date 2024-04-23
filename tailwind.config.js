/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seat: '#CCCCCC', // Define your seat color
        selected: '#FF0000', // Define your selected seat color
        occupied: '#000000', // Define your occupied seat color
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}