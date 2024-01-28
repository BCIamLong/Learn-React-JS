/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // *https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
    // * go to this page and see all the things we can config and the value to config
    fontFamily: {
      customFont: 'Roboto Mono, monospace',

      sans: 'Roboto Mono, monospace', //* by default Tailwind will come with our text with this sans font and by doing this we will custom all the text on our application to our new font family so this is trick we can do
    },

    // fontSize: {
    // ! if we put the our custom style like this so outside the extend in this case fontSize and then all the fontSize of Tailwind come out of the box for us will be lost
    // ! and now we only have these own custom fontSizes, so notice that if we want to add new custom color but still keep the fontSize pallette of Tailwind we can write this inside the extend
    //   big: ['12rem', { lineHeight: '1' }],
    // },

    extend: {
      colors: {
        productColor: '#123',
      },

      fontSize: {
        big: ['12rem', { lineHeight: '1' }],
      },

      height: {
        screen: '100dvh', //* this is for the problem in the mobile browser sometime the height not 100% of the screen, and we can fix this with the modern unit called 100dvh
        // * and dvh stand for dynamic viewport height
      },
    },
  },
  plugins: [],
};
