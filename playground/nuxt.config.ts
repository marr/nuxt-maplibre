export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  compatibilityDate: '2025-10-01',
  devtools: {
    enabled: false,
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
  vite: {
    ssr: {
      noExternal: ['@indoorequal/vue-maplibre-gl'],
    },
  },
})