/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        deepBlue: '#03005E',
        lightBlue: '#006FBE',
        royalPurple: '#5C005A',
        lightPurple: '#A700B7',
      }
    },
  },
  plugins: [],
}
