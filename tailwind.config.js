module.exports = {
  // purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // In your tailwind.config.js file, configure the purge option with the paths to all of your components so Tailwind can tree-shake unused styles in production builds
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
