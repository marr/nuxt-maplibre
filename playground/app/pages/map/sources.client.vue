<script setup lang="ts">
import type { ExpressionSpecification, LngLatLike, PropertyValueSpecification } from 'maplibre-gl'

const { current } = useMapStyle()
const colorMode = useColorMode()

const center = ref<LngLatLike>([-100, 40])
const zoom = ref(3)
const visibleLayers = ref(['city-circles', 'city-labels'])

/** User overrides from the color pickers; when unset, theme defaults apply. */
const circleColorOverride = ref<string | null>(null)
const labelColorOverride = ref<string | null>(null)

const isDark = computed(() => colorMode.value === 'dark')

const themeLayerColors = computed(() => ({
  circle: isDark.value ? '#34d399' : '#03C169',
  label: isDark.value ? '#e2e8f0' : '#334155',
  labelHalo: isDark.value ? 'rgba(15, 15, 15, 0.9)' : 'rgba(255, 255, 255, 0.92)',
  circleStroke: isDark.value ? '#f8fafc' : '#1a1a1a',
  ringOpacity: isDark.value ? 0.55 : 0.4,
}))

const circleColor = computed({
  get: () => circleColorOverride.value ?? themeLayerColors.value.circle,
  set: (value: string) => {
    circleColorOverride.value = value
  },
})

const labelColor = computed({
  get: () => labelColorOverride.value ?? themeLayerColors.value.label,
  set: (value: string) => {
    labelColorOverride.value = value
  },
})

const showCircles = computed(() => visibleLayers.value.includes('city-circles'))
const showLabels = computed(() => visibleLayers.value.includes('city-labels'))
const circleColorChip = computed(() => ({ backgroundColor: circleColor.value }))
const labelColorChip = computed(() => ({ backgroundColor: labelColor.value }))

const labelPaint = computed(() => ({
  'text-color': labelColor.value,
  'text-halo-color': themeLayerColors.value.labelHalo,
  'text-halo-width': isDark.value ? 1.75 : 1.5,
  'text-halo-blur': isDark.value ? 0.35 : 0.25,
}))

const circlePaint = computed(() => ({
  'circle-radius': 8,
  'circle-color': circleColor.value,
  'circle-stroke-width': 2,
  'circle-stroke-color': themeLayerColors.value.circleStroke,
  'circle-stroke-opacity': themeLayerColors.value.ringOpacity,
}))

const circleLayout = computed(() => ({
  visibility: (showCircles.value ? 'visible' : 'none') as 'visible' | 'none',
}))

const labelLayout = computed(() => ({
  'text-field': ['get', 'name'] as ExpressionSpecification,
  'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
  'text-anchor': 'top' as const,
  'text-offset': [0, 1.1] as PropertyValueSpecification<[number, number]>,
  'text-size': 13,
  'text-line-height': 1.2,
  'text-max-width': 10,
  'text-allow-overlap': true,
  'text-ignore-placement': true,
  visibility: (showLabels.value ? 'visible' : 'none') as 'visible' | 'none',
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
    label: 'Circle markers',
    description: `city-circles · ${showCircles.value ? 'Visible' : 'Hidden'}`,
    value: 'city-circles',
    color: circleColor.value,
  },
  {
    id: 'city-labels',
    label: 'City names',
    description: `city-labels · ${showLabels.value ? 'Visible' : 'Hidden'}`,
    value: 'city-labels',
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
    <MglGeoJsonSource :key="current.key" :data="geojson" source-id="cities">
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
            <p class="text-xs font-medium text-(--ui-text-muted)">
              Source
            </p>
            <dl class="mt-2 grid grid-cols-3 gap-x-2 gap-y-3 text-xs">
              <div>
                <dt class="text-[11px] font-medium text-(--ui-text-muted)">
                  ID
                </dt>
                <dd class="mt-0.5 font-mono text-sm text-(--ui-text-highlighted) truncate">
                  {{ sourceState.id }}
                </dd>
              </div>
              <div>
                <dt class="text-[11px] font-medium text-(--ui-text-muted)">
                  Type
                </dt>
                <dd class="mt-0.5 font-mono text-sm text-(--ui-text-highlighted)">
                  {{ sourceState.type }}
                </dd>
              </div>
              <div>
                <dt class="text-[11px] font-medium text-(--ui-text-muted)">
                  Features
                </dt>
                <dd class="mt-0.5 font-mono text-sm text-(--ui-text-highlighted) tabular-nums">
                  {{ sourceState.features }}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p class="text-xs font-medium text-(--ui-text-muted)">
              Layers
            </p>
            <UListbox
              v-model="visibleLayers"
              :items="layerState"
              multiple
              value-key="value"
              class="mt-2"
              :ui="{
                root: 'ring-default',
                item: 'cursor-pointer',
                itemLabel: 'font-medium text-(--ui-text-highlighted)',
                itemDescription: 'text-[11px] text-(--ui-text-muted) font-mono',
              }"
            >
              <template #item-leading="{ item }">
                <span
                  class="size-3 shrink-0 rounded-full ring ring-default"
                  :style="{ backgroundColor: item.color }"
                />
              </template>
            </UListbox>
          </div>

          <div>
            <p class="text-xs font-medium text-(--ui-text-muted)">
              Colors
            </p>
            <div class="mt-2 grid grid-cols-2 gap-2">
              <UPopover>
                <UButton label="Circles" color="neutral" variant="outline" size="xs" block>
                  <template #leading>
                    <span :style="circleColorChip" class="size-3 rounded-full ring ring-default" />
                  </template>
                </UButton>

                <template #content>
                  <UColorPicker v-model="circleColor" format="hex" size="xs" class="p-2" />
                </template>
              </UPopover>

              <UPopover>
                <UButton label="Labels" color="neutral" variant="outline" size="xs" block>
                  <template #leading>
                    <span :style="labelColorChip" class="size-3 rounded-full ring ring-default" />
                  </template>
                </UButton>

                <template #content>
                  <UColorPicker v-model="labelColor" format="hex" size="xs" class="p-2" />
                </template>
              </UPopover>
            </div>
          </div>
        </div>
      </MapControl>
    </MglCustomControl>
  </MglMap>
</template>
