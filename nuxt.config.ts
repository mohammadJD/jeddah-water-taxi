// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
  // i18n: {
  //   locales: [
  //     { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
  //     { code: 'ar', name: 'Arabic', iso: 'ar-SA', file: 'ar.json' },
  //   ],
  //   defaultLocale: 'en',
  //   lazy: true,
  //   langDir: 'locales/',
  //   strategy: 'prefix_except_default',
  // //   vueI18n: {
  // //     legacy: false,
  // //     locale: 'en',
  // //     fallbackLocale: 'en',
  // //   },
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieName: 'i18n_lang',
  //     redirectOn: 'root' // Recommended: 'fallback'
  //   },
  // },
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader()
    ],
  },
})
