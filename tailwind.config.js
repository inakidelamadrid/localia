const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-pink': '#ec5990',
        gray: colors.warmGray,
      },
      fontFamily: {
        sans: ['Biryani', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
        montserrat: ['Montserrat'],
        syne: ['Syne'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
