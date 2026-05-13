<script setup lang="ts">
import maplibre from 'maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const route = useRoute()
const router = useRouter()

const defaultMarker: [number, number] = [-70.84961090021761, 42.262697082725936]
const defaultCenter: [number, number] = [-70.99472213822588, 42.37041979229858]

function parseMarkerHash(value: string): [number, number] | undefined {
  const rawValue = value.replace(/^#/, '')

  if (!rawValue.startsWith('marker=')) {
    return undefined
  }

  const [lat, lng] = rawValue.slice('marker='.length).split(',').map(Number)

  if (
    Number.isFinite(lat)
    && Number.isFinite(lng)
    && lat >= -90
    && lat <= 90
    && lng >= -180
    && lng <= 180
  ) {
    return [lng, lat]
  }

  return undefined
}

function formatMarkerHash(coordinates: LngLatLike) {
  const { lat, lng } = maplibre.LngLat.convert(coordinates)

  return `#marker=${lat.toFixed(5)},${lng.toFixed(5)}`
}

const initialMarker = parseMarkerHash(route.hash) ?? defaultMarker
const center = ref<LngLatLike>(parseMarkerHash(route.hash) ?? defaultCenter)
const zoom = ref(10)
const marker = ref<LngLatLike>(initialMarker)
const draggable = ref(true)

watch(
  () => route.hash,
  (value) => {
    const nextMarker = parseMarkerHash(value)

    if (!nextMarker) {
      return
    }

    marker.value = nextMarker
    center.value = nextMarker
  },
)

watch(
  () => formatMarkerHash(marker.value),
  async (markerHash) => {
    if (route.hash === markerHash) {
      return
    }

    await router.replace({
      path: route.path,
      query: route.query,
      hash: markerHash,
    })
  },
)
</script>
<template>
  <MglMap
    v-model:center="center"
    v-model:zoom="zoom"
    :map-style="current.style"
    :attribution-control="{ compact: true }"
  >
    <MglNavigationControl />
    <MglMarker v-model:coordinates="marker" :draggable="draggable">
      <MglPopup
        anchor="bottom"
        :offset="[0, -40]"
        class-name="playground-marker-popup"
        max-width="none"
        :close-button="false"
        :close-on-click="false"
      >
        <MarkerPopupContent :coordinates="marker" title="Coordinates" />
      </MglPopup>
    </MglMarker>
    <MglCustomControl class="pointer-events-auto p-2" position="bottom-left">
      <DraggableToggle v-model:draggable="draggable" />
    </MglCustomControl>
  </MglMap>
</template>
