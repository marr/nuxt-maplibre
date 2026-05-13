<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import maplibre from 'maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()

const defaultMarker: [number, number] = [-70.84961090021761, 42.262697082725936]
const defaultCenter: [number, number] = [-70.99472213822588, 42.37041979229858]

function parseMarkerQuery(value: string): [number, number] | undefined {
  const [lat, lng] = value.split(',').map(Number)

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

const markerQuery = useRouteQuery<string, [number, number] | undefined>('marker', '', {
  transform: {
    get: parseMarkerQuery,
    set: value => value ? formatMarkerQuery(value) : '',
  },
})

const initialMarker = markerQuery.value ?? defaultMarker
const center = ref<LngLatLike>(markerQuery.value ?? defaultCenter)
const zoom = ref(10)
const marker = ref<LngLatLike>(initialMarker)
const draggable = ref(true)

watch(
  markerQuery,
  (coordinates) => {
    if (!coordinates) {
      return
    }

    marker.value = coordinates
    center.value = coordinates
  },
)

watch(
  () => formatMarkerQuery(marker.value),
  () => {
    const coordinates = maplibre.LngLat.convert(marker.value)
    const nextMarker: [number, number] = [coordinates.lng, coordinates.lat]

    if (
      markerQuery.value
      && markerQuery.value[0] === nextMarker[0]
      && markerQuery.value[1] === nextMarker[1]
    ) {
      return
    }

    markerQuery.value = nextMarker
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
