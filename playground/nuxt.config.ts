export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  runtimeConfig: {
    public: {
      mapTilerKey: '',
      googleMapTilesApiKey: ''
    }
  },
  compatibilityDate: '2024-10-26'
})