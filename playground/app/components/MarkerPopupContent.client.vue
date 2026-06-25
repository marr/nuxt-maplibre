<script setup lang="ts">
import maplibre from 'maplibre-gl'
import type { LngLatLike } from 'maplibre-gl'

const props = withDefaults(
  defineProps<{
    coordinates: LngLatLike
    eyebrow?: string
    title?: string
  }>(),
  { eyebrow: 'Marker', title: 'Position' },
)

const point = computed(() => maplibre.LngLat.convert(props.coordinates))
const latStr = computed(() => point.value.lat.toFixed(5))
const lngStr = computed(() => point.value.lng.toFixed(5))
</script>

<template>
  <UCard
    variant="subtle"
    class="w-64"
    :ui="{
      root: 'rounded-xl overflow-visible shadow-lg',
      header: 'p-3 sm:p-3',
      body: 'p-3 sm:p-3',
    }"
  >
    <template #header>
      <div class="flex items-start gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-default ring ring-default"
        >
          <UIcon name="i-lucide-map-pin" class="size-5 text-primary" />
        </div>
        <div class="min-w-0 flex-1 pt-0.5">
          <p class="text-dimmed text-[0.65rem] font-semibold tracking-wider uppercase">
            {{ eyebrow }}
          </p>
          <p class="text-highlighted text-sm font-semibold leading-snug">
            {{ title }}
          </p>
        </div>
      </div>
    </template>

    <dl class="space-y-2.5">
      <div class="flex items-center justify-between gap-4">
        <dt class="text-muted text-xs font-medium">Latitude</dt>
        <dd class="text-highlighted font-mono text-xs tabular-nums">
          {{ latStr }}
        </dd>
      </div>
      <div class="flex items-center justify-between gap-4">
        <dt class="text-muted text-xs font-medium">Longitude</dt>
        <dd class="text-highlighted font-mono text-xs tabular-nums">
          {{ lngStr }}
        </dd>
      </div>
    </dl>
  </UCard>
</template>
