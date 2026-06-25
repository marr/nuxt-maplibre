import maplibregl from 'maplibre-gl'
import type { StyleSpecification } from 'maplibre-gl'
import { createGoogleStyle, googleProtocol } from 'maplibre-google-maps'

maplibregl.addProtocol('google', googleProtocol)

export interface MapStyleOption {
  key: string
  label: string
  icon: string
  style: string | StyleSpecification
  /** Used when Nuxt Color Mode is dark (same provider, dark basemap). */
  styleDark?: string | StyleSpecification
}

export function useMapStyle() {
  const { clockworkApiKey, mapTilerKey, googleMapTilesApiKey } = useRuntimeConfig().public
  const colorMode = useColorMode()

  const styles: MapStyleOption[] = [
    {
      key: 'dataviz',
      label: 'MapTiler Dataviz',
      icon: 'i-simple-icons-maptiler',
      style: 'https://api.maptiler.com/maps/dataviz-v4/style.json?key=' + mapTilerKey,
      styleDark: 'https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=' + mapTilerKey,
    },
    {
      key: 'streets',
      label: 'MapTiler Streets',
      icon: 'i-simple-icons-maptiler',
      style: 'https://api.maptiler.com/maps/streets-v4/style.json?key=' + mapTilerKey,
      styleDark: 'https://api.maptiler.com/maps/streets-v4-dark/style.json?key=' + mapTilerKey,
    },
    {
      key: 'satellite',
      label: 'MapTiler Satellite',
      icon: 'i-simple-icons-maptiler',
      style: 'https://api.maptiler.com/maps/hybrid-v4/style.json?key=' + mapTilerKey,
      styleDark: 'https://api.maptiler.com/maps/hybrid-v4-dark/style.json?key=' + mapTilerKey,
    },
    {
      key: 'clockwork-streets',
      label: 'Clockwork Streets',
      icon: 'i-lucide-cog',
      style: `https://maps.clockworkmicro.com/streets/v1/style?x-api-key=${clockworkApiKey}`,
    },
    {
      key: 'google-satellite',
      label: 'Google Satellite',
      icon: 'i-simple-icons-googlemaps',
      style: createGoogleStyle('google', 'satellite', googleMapTilesApiKey),
    },
    {
      key: 'google-roadmap',
      label: 'Google Roadmap',
      icon: 'i-simple-icons-googlemaps',
      style: createGoogleStyle('google', 'roadmap', googleMapTilesApiKey),
    },
    {
      key: 'maplibre-demo',
      label: 'MapLibre Demotiles',
      icon: 'i-simple-icons-maplibre',
      style: 'https://demotiles.maplibre.org/style.json',
    },
    {
      key: 'openfreemap-liberty',
      label: 'OpenFreeMap Liberty',
      icon: 'i-lucide-map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
    },
    {
      key: 'openfreemap-bright',
      label: 'OpenFreeMap Bright',
      icon: 'i-lucide-map',
      style: 'https://tiles.openfreemap.org/styles/bright',
    },
  ]

  const selectedKey = useState('map-style-key', () => 'streets')

  const current = computed(() => {
    const option = styles.find(s => s.key === selectedKey.value) ?? styles[0]!
    const useDark = colorMode.value === 'dark' && option.styleDark !== undefined
    return {
      ...option,
      style: useDark ? option.styleDark! : option.style,
    }
  })

  return { styles, selectedKey, current }
}
