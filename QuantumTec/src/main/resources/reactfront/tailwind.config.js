/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx.ts,tsx}"],
  theme: {
    extend: {},
    minWidth:{
      '1/3': '33%',
    },
    width:{
      'mypagesection': 'calc(100% - 280px)',
    }
  },
  plugins: [],
}

