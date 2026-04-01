import {
  defineNuxtModule,
  addComponent,
  addImports,
  addTemplate,
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  css: string | string[] | false
}

// Components to export
export const components = [
  'MglImage',
  'MglMap',
  'MglMarker',
  'MglPopup',
  // Controls
  'MglAttributionControl',
  'MglCustomControl',
  'MglFullscreenControl',
  'MglGeolocateControl',
  'MglLogoControl',
  'MglNavigationControl',
  'MglScaleControl',
  // Sources
  'MglCanvasSource',
  'MglGeoJsonSource',
  'MglImageSource',
  'MglRasterDemSource',
  'MglRasterSource',
  'MglVectorSource',
  'MglVideoSource',
  // Layers
  'MglBackgroundLayer',
  'MglCircleLayer',
  'MglFillExtrusionLayer',
  'MglFillLayer',
  'MglHeatmapLayer',
  'MglHillshadeLayer',
  'MglLineLayer',
  'MglRasterLayer',
  'MglSymbolLayer',
]

// Composition functions to export
export const composables = [
  'useMap',
  'useControl',
  'useDisposableLayer',
  'usePositionWatcher',
  'useSource',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@dmarr/nuxt-maplibre',
    configKey: 'maplibre',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    css: 'maplibre-theme/modern.css',
  },
  async setup(options, nuxt) {
    // @indoorequal/vue-maplibre-gl has no `exports` field,
    // so Vite resolves `main` (UMD) instead of the ESM build.
    nuxt.options.vite.resolve ??= {}
    const alias = nuxt.options.vite.resolve.alias ??= {}
    if (typeof alias === 'object' && !Array.isArray(alias)) {
      (alias as Record<string, string>)['@indoorequal/vue-maplibre-gl'] =
        '@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.es.js'
    }

    // Auto-import vue-maplibre-gl components
    for (const component of components) {
      addComponent({
        name: component,
        export: component,
        filePath: '@indoorequal/vue-maplibre-gl',
        chunkName: `nuxt-maplibre/${component}`,
        mode: 'all',
      })
    }

    // Auto-import vue-maplibre-gl composables
    for (const composable of composables) {
      addImports({
        name: composable,
        as: 'useMgl' + composable.slice(3),
        from: '@indoorequal/vue-maplibre-gl',
      })
    }

    // Always inject the lucide icon CSS variable template
    const template = addTemplate({
      filename: 'assets/styles.css',
      getContents: () => {
        return `.maplibregl-map {
  --ml-font-icons: maplibregl-icons-lucide;
}`
      },
    })
    nuxt.options.css.push(template.dst)

    // Add CSS stylesheets if not disabled
    if (options.css) {
      const cssEntries = Array.isArray(options.css) ? options.css : [options.css]
      nuxt.options.css.push(
        'maplibre-theme/icons.lucide.css',
        ...cssEntries,
      )
    }
  },
})
