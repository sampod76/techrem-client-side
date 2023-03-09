/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteRgb: "rgba(240, 217, 234, 0.98)",
        secondary: "#FFF0D9",
      },
      screens: {
        sm: '480px',
        smm: '668px',
        md: '768px',
        mdd: '896px',
        lg: '976px',
        lgg: '1160px',
        lggg: '1230px',
        xl: '1440px',
        xxl: '1920px',
      },
      // fontFamily: {
      //   'Lora': ['"Lora"', 'serif'],
      //   'Poppins': ['"Poppins"', 'sans-serif'],
      // },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}