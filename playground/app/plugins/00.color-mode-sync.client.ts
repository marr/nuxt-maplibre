type ColorModeState = {
  preference: string
  value: string
  unknown: boolean
  forced: boolean
}

type ColorModeHelper = {
  preference: string
  value: string
}

/**
 * SSR cannot read localStorage, so @nuxtjs/color-mode hydrates with the config
 * default ("system"). Sync from the inline head script before other plugins
 * run so map style and UI match the stored preference on first paint.
 */
export default defineNuxtPlugin({
  name: 'playground-color-mode-sync',
  enforce: 'pre',
  setup() {
    const colorMode = useState<ColorModeState>('color-mode')
    const helper = (window as Window & { __NUXT_COLOR_MODE__?: ColorModeHelper }).__NUXT_COLOR_MODE__

    if (!helper || !colorMode.value?.unknown) {
      return
    }

    colorMode.value.preference = helper.preference
    colorMode.value.value = helper.value
    colorMode.value.unknown = false
  },
})
