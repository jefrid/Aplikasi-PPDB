/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '#64B5F6',
          DEFAULT: '#1E88E5',
          dark: '#1565C0',
        },
        'secondary': {
          light: '#4CAF50',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
        }
      },
      fontFamily: {
        arabic: ['Arial', 'sans-serif'], // We can replace this with an actual Arabic font if needed
      },
    },
  },
  plugins: [],
};