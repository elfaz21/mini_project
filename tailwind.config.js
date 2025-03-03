/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          100: '#ede9fe', // Light violet
          600: '#FF004CFF', // Dark violet
        }
      }
    }
  },
  plugins: [],
}

