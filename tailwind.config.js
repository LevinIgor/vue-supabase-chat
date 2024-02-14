// tailwind.config.js
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'black-100': '#1a1a1a'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
