const maplibreDeps = [
  'maplibre-gl',
  '@indoorequal/vue-maplibre-gl',
  'maplibre-google-maps',
] as const

export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  compatibilityDate: '2025-05-14',
  build: {
    // UMD-ish maplibre dist: bundle for SSR/prerender so named imports (e.g. LngLat) resolve.
    transpile: [...maplibreDeps],
  },
  vite: {
    ssr: {
      noExternal: [...maplibreDeps],
    },
  },
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