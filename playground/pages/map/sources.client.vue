<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()
const colorMode = useColorMode()

const center = ref<LngLatLike>([-100, 40])
const zoom = ref(3)
const visibleLayers = ref(['city-circles', 'city-labels'])
const circleColor = ref('#03C169')
const labelColor = ref('#1A73E8')

const showCircles = computed(() => visibleLayers.value.includes('city-circles'))
const showLabels = computed(() => visibleLayers.value.includes('city-labels'))

const labelPaint = computed(() =>
  ({
    'text-color': labelColor.value,
    'text-halo-color': colorMode.value === 'dark' ? '#1a1a1a' : '#ffffff',
    'text-halo-width': 1,
  })
)

const circlePaint = computed(() => ({
  'circle-radius': 8,
  'circle-color': circleColor.value,
  'circle-stroke-width': 2,
  'circle-stroke-color': '#ffffff',
}))

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
    label: 'city-circles',
    description: `circle · ${showCircles.value ? 'visible' : 'hidden'}`,
    value: 'city-circles',
    type: 'circle',
    visible: showCircles.value,
    color: circleColor.value,
  },
  {
    id: 'city-labels',
    label: 'city-labels',
    description: `symbol · ${showLabels.value ? 'visible' : 'hidden'}`,
    value: 'city-labels',
    type: 'symbol',
    visible: showLabels.value,
    color: labelColor.value,
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
        :paint="circlePaint"
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
            <UListbox
              v-model="visibleLayers"
              :items="layerState"
              multiple
              value-key="value"
              class="mt-2"
              :ui="{ root: 'ring-default', item: 'cursor-pointer' }"
            >
              <template #item-leading="{ item }">
                <span
                  class="size-3 rounded-full ring ring-default"
                  :style="{ backgroundColor: item.color }"
                />
              </template>

              <template #item-label="{ item }">
                <span class="font-mono text-xs">{{ item.label }}</span>
              </template>

              <template #item-trailing="{ item }">
                <label @click.stop @pointerdown.stop>
                  <span class="sr-only">Set {{ item.label }} color</span>
                  <input
                    v-if="item.value === 'city-circles'"
                    v-model="circleColor"
                    type="color"
                    class="size-6 cursor-pointer rounded border border-(--ui-border) bg-transparent p-0"
                  >
                  <input
                    v-else
                    v-model="labelColor"
                    type="color"
                    class="size-6 cursor-pointer rounded border border-(--ui-border) bg-transparent p-0"
                  >
                </label>
              </template>
            </UListbox>
          </div>
        </div>
      </MapControl>
    </MglCustomControl>
  </MglMap>
</template>
