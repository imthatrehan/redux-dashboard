/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'md1': '850px',
      },
      fontFamily: {
        libre: ['Libre Caslon Condensed', 'sans-serif'],
        quick: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
