<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const colorMode = useColorMode()

const center = ref<LngLatLike>([-100, 40])
const zoom = ref(3)

const ringOpacity = 0.4

const labelPaint = computed(() =>
  colorMode.value === 'dark'
    ? {
        'text-color': '#f5f5f5',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-opacity': ringOpacity,
      }
    : {
        'text-color': '#1a1a1a',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-opacity': ringOpacity,
      }
)

const circleRingPaint = computed(() => ({
  'circle-radius': 9,
  'circle-color': 'rgba(0, 0, 0, 0)',
  'circle-stroke-width': 2,
  'circle-stroke-color': colorMode.value === 'dark' ? '#ffffff' : '#1a1a1a',
  'circle-stroke-opacity': ringOpacity,
}))

const circleFillPaint = computed(() => ({
  'circle-radius': 8,
  'circle-color': '#03C169',
  'circle-stroke-width': 0,
}))

const geojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749],
      },
      properties: { name: 'San Francisco' },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-73.935242, 40.730610],
      },
      properties: { name: 'New York' },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-87.6298, 41.8781],
      },
      properties: { name: 'Chicago' },
    },
  ],
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
    <MglGeoJsonSource :data="geojson" source-id="cities">
      <MglCircleLayer
        layer-id="city-circles-ring"
        :paint="circleRingPaint"
      />
      <MglCircleLayer
        layer-id="city-circles"
        :paint="circleFillPaint"
      />
      <MglSymbolLayer
        layer-id="city-labels"
        :layout="{
          'text-field': ['get', 'name'],
          'text-offset': [0, 1.5],
          'text-size': 12,
        }"
        :paint="labelPaint"
      />
    </MglGeoJsonSource>
  </MglMap>
</template>
