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
})