import { setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'

/**
 * MapLibre GL v6 resolves its worker from import.meta.url, which breaks once Vite
 * pre-bundles or rewrites the main bundle. vue-maplibre-gl's VitePress examples use
 * the same ?worker&url pattern (docs/examples/example.data.js).
 */
setWorkerUrl(workerUrl)

export default defineNuxtPlugin(() => {})
