module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': ['Art Company Mono', 'serif'],
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
    // fontSize: {
    //   base: ['1.4rem', '1.6'],
    //   lg: ['2.3rem', '1.6'],
    //   md: ['1.6rem', '1.8'],
    // },
    flex: {
      '0-0': '0 0 auto',
    },
  },
  plugins: [],
}
