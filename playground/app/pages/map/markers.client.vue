<script setup lang="ts">
import { LngLat } from 'maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const route = useRoute()
const router = useRouter()

const defaultMarker: [number, number] = [-70.84961090021761, 42.262697082725936]
const defaultCenter: [number, number] = [-70.99472213822588, 42.37041979229858]

const MARKER_QUERY_KEY = 'marker'

function parseMarkerPair(raw: string | undefined): [number, number] | undefined {
  if (!raw) {
    return undefined
  }

  const [lat, lng] = raw.split(',').map(Number)

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
  const { lat, lng } = LngLat.convert(coordinates)

  return `${lat.toFixed(5)},${lng.toFixed(5)}`
}

function markerFromRoute(): [number, number] | undefined {
  const fromQuery = route.query[MARKER_QUERY_KEY]
  const queryRaw = Array.isArray(fromQuery) ? fromQuery[0] : fromQuery

  return parseMarkerPair(typeof queryRaw === 'string' ? queryRaw : undefined)
}

const initialMarker = markerFromRoute() ?? defaultMarker
const center = ref<LngLatLike>(markerFromRoute() ?? defaultCenter)
const zoom = ref(10)
const marker = ref<LngLatLike>(initialMarker)
const draggable = ref(true)

watch(
  () => route.query[MARKER_QUERY_KEY],
  () => {
    const nextMarker = markerFromRoute()

    if (!nextMarker) {
      return
    }

    marker.value = nextMarker
  },
)

function syncMarkerQueryToRoute() {
  const markerQuery = formatMarkerQuery(marker.value)
  const currentQuery = route.query[MARKER_QUERY_KEY]
  const currentRaw = Array.isArray(currentQuery) ? currentQuery[0] : currentQuery

  if (currentRaw === markerQuery) {
    return
  }

  void router.replace({
    path: route.path,
    query: {
      ...route.query,
      [MARKER_QUERY_KEY]: markerQuery,
    },
  })
}
</script>
<template>
  <MglMap
    v-model:center="center"
    v-model:zoom="zoom"
    :map-style="current.style"
    :attribution-control="{ compact: true }"
  >
    <MglNavigationControl />
    <MglMarker
      v-model:coordinates="marker"
      :draggable="draggable"
      @dragend="syncMarkerQueryToRoute"
    >
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
