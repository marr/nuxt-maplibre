type ColorModeHelper = {
  value: string
}

/**
 * Resolved light/dark value for map styling. Falls back to the inline
 * color-mode script during the SSR hydration gap.
 */
export function useResolvedColorMode() {
  const colorMode = useColorMode()

  return computed(() => {
    if (colorMode.value === 'dark') {
      return 'dark' as const
    }

    if (colorMode.value === 'light') {
      return 'light' as const
    }

    if (import.meta.client) {
      const helper = (window as Window & { __NUXT_COLOR_MODE__?: ColorModeHelper }).__NUXT_COLOR_MODE__
      if (helper?.value === 'dark' || helper?.value === 'light') {
        return helper.value
      }
    }

    return 'light' as const
  })
}
