// tailwind.config.js
module.exports = {
   purge: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue"
   ],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         colors: {
            transparent: 'transparent',
            current: 'currentColor'
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}