<script setup lang="ts">
import maplibre from 'maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const route = useRoute()
const router = useRouter()

const defaultMarker: [number, number] = [-70.84961090021761, 42.262697082725936]
const defaultCenter: [number, number] = [-70.99472213822588, 42.37041979229858]

function parseMarkerQuery(value: unknown): [number, number] | undefined {
  const rawValue = Array.isArray(value) ? value[0] : value

  if (typeof rawValue !== 'string') {
    return undefined
  }

  const [lat, lng] = rawValue.split(',').map(Number)

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

function formatMarkerQuery(coordinates: LngLatLike) {
  const { lat, lng } = maplibre.LngLat.convert(coordinates)

  return `${lat.toFixed(5)},${lng.toFixed(5)}`
}

const initialMarker = parseMarkerQuery(route.query.marker) ?? defaultMarker
const center = ref<LngLatLike>(parseMarkerQuery(route.query.marker) ?? defaultCenter)
const zoom = ref(10)
const marker = ref<LngLatLike>(initialMarker)
const draggable = ref(true)

watch(
  () => route.query.marker,
  (value) => {
    const nextMarker = parseMarkerQuery(value)

    if (!nextMarker) {
      return
    }

    marker.value = nextMarker
    center.value = nextMarker
  },
)

watch(
  () => formatMarkerQuery(marker.value),
  async (markerQuery) => {
    if (route.query.marker === markerQuery) {
      return
    }

    await router.replace({
      query: {
        ...route.query,
        marker: markerQuery,
      },
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
