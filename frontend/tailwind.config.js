import daisyui from 'daisyui'

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this is correct for your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro","synthwave","aqua"], // Themes you want to use
  },
};
