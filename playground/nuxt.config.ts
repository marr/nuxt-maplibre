export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  compatibilityDate: '2025-05-14',
  devtools: {
    enabled: true,
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      clockworkApiKey: '',
      mapTilerKey: '',
      googleMapTilesApiKey: ''
    }
  },
  nitro: {
    prerender: {
      ignore: ['/map/markers', '/map/sources', '/map/controls'],
    },
  },
})