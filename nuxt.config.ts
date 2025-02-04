// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  compatibilityDate: '2025-02-04',
  devtools: { enabled: false },
  ssr: true, // default is true
  modules: ['@pinia/nuxt','@nuxtjs/i18n'],
  alias:{
    assets: '/<rootDir>/assets'
  },
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/sass/main.scss',
    '@/assets/sass/font.scss',
  ],
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
  },
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader()
    ],
  },
})