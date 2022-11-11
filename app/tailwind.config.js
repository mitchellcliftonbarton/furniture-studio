module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': ['Art Company Mono', 'serif'],
      'secondary': ['Lifted', 'sans-serif'],
    },
    colors: {
      grey: {
        lighter: '#D7D7D7',
        light: '#F3F5F3',
        med: '#E7E7E7',
        'med-dark': '#3A3A3A',
        dark: '#2B2B2B',
      },
      white: '#fff',
      black: '#000',
      transparent: 'transparent'
    },
    flex: {
      '0-0': '0 0 auto',
    },
    extend: {
      spacing: {
        'def': '2.5rem',
        'def-mobile': '1.5rem',
      },
    },
  },
  plugins: [],
}
