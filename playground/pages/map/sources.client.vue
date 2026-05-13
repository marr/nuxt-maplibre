<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const colorMode = useColorMode()

const center = ref<LngLatLike>([-100, 40])
const zoom = ref(3)
const showCircles = ref(true)
const showLabels = ref(true)

const labelPaint = computed(() =>
  colorMode.value === 'dark'
    ? {
        'text-color': '#f5f5f5',
        'text-halo-color': '#1a1a1a',
        'text-halo-width': 1,
      }
    : {
        'text-color': '#1a1a1a',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
      }
)

const circleLayout = computed(() => ({
  visibility: showCircles.value ? 'visible' : 'none',
}))

const labelLayout = computed(() => ({
  'text-field': ['get', 'name'],
  'text-offset': [0, 1.5],
  'text-size': 12,
  visibility: showLabels.value ? 'visible' : 'none',
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

const sourceState = computed(() => ({
  id: 'cities',
  type: 'geojson',
  features: geojson.features.length,
}))

const layerState = computed(() => [
  {
    id: 'city-circles',
    type: 'circle',
    visible: showCircles.value,
  },
  {
    id: 'city-labels',
    type: 'symbol',
    visible: showLabels.value,
  },
])
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
        layer-id="city-circles"
        :layout="circleLayout"
        :paint="{
          'circle-radius': 8,
          'circle-color': '#03C169',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        }"
      />
      <MglSymbolLayer
        layer-id="city-labels"
        :layout="labelLayout"
        :paint="labelPaint"
      />
    </MglGeoJsonSource>

    <MglCustomControl class="pointer-events-auto p-2" position="top-left">
      <MapControl class="w-72">
        <div class="space-y-4">
          <div>
            <p class="text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide">
              Source
            </p>
            <div class="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p class="text-(--ui-text-muted)">ID</p>
                <p class="font-mono text-(--ui-text-highlighted)">{{ sourceState.id }}</p>
              </div>
              <div>
                <p class="text-(--ui-text-muted)">Type</p>
                <p class="font-mono text-(--ui-text-highlighted)">{{ sourceState.type }}</p>
              </div>
              <div>
                <p class="text-(--ui-text-muted)">Features</p>
                <p class="font-mono text-(--ui-text-highlighted)">{{ sourceState.features }}</p>
              </div>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide">
              Layers
            </p>
            <div class="mt-2 space-y-2">
              <div
                v-for="layer in layerState"
                :key="layer.id"
                class="flex items-center justify-between gap-3 rounded-md bg-(--ui-bg-elevated)/70 px-2 py-1.5"
              >
                <div>
                  <p class="font-mono text-xs text-(--ui-text-highlighted)">{{ layer.id }}</p>
                  <p class="text-xs text-(--ui-text-muted)">{{ layer.type }}</p>
                </div>
                <UBadge
                  :color="layer.visible ? 'success' : 'neutral'"
                  variant="soft"
                  size="sm"
                >
                  {{ layer.visible ? 'visible' : 'hidden' }}
                </UBadge>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <UButton
              :label="showCircles ? 'Hide circles' : 'Show circles'"
              :variant="showCircles ? 'soft' : 'outline'"
              color="primary"
              size="xs"
              block
              @click="showCircles = !showCircles"
            />
            <UButton
              :label="showLabels ? 'Hide labels' : 'Show labels'"
              :variant="showLabels ? 'soft' : 'outline'"
              color="primary"
              size="xs"
              block
              @click="showLabels = !showLabels"
            />
          </div>
        </div>
      </MapControl>
    </MglCustomControl>
  </MglMap>
</template>
