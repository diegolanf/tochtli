/** @type {import('tailwindcss').Config} */
defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Roboto Mono', defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
