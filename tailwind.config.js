/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      maxWidth: {
        'container': '100%', 
      },
      screens: {
        'lg': '1024px', 
      }
    },
  },
  plugins: [],
};
