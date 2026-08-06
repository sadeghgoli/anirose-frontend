/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        peyda: ['var(--font-peyda)', ...defaultTheme.fontFamily.sans],
        pinar: ['var(--font-pinar)', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('tailwindcss-rtl'),
  ],
}