/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        starjedi: ['starjedi', 'sans-serif'],
        aurebesh: ['aurebesh', 'sans-serif'],
        exo2: ['exo2', 'sans-serif']
      }
    },
  },
  plugins: [],
}

