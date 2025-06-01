<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { createGoogleStyle, googleProtocol } from 'maplibre-google-maps'
import type { DropdownMenuItem } from '@nuxt/ui'

maplibregl.addProtocol("google", googleProtocol);

const { mapTilerKey, googleMapTilesApiKey } = useRuntimeConfig().public;
const styleMap = {
  'maplibre-demo': 'https://demotiles.maplibre.org/style.json',
  dataviz: "https://api.maptiler.com/maps/dataviz/style.json?key=" + mapTilerKey,
  streets: "https://api.maptiler.com/maps/streets/style.json?key=" + mapTilerKey,
  satellite: "https://api.maptiler.com/maps/satellite/style.json?key=" + mapTilerKey,
  'google-satellite': createGoogleStyle("google", "satellite", googleMapTilesApiKey),
  'google-roadmap': createGoogleStyle("google", "roadmap", googleMapTilesApiKey),
};

const style = ref<keyof typeof styleMap>('google-roadmap');

const styleOptions = [
  { key: 'google-satellite', label: 'Google Satellite', icon: 'i-simple-icons-googlemaps' },
  { key: 'google-roadmap', label: 'Google Roadmap', icon: 'i-simple-icons-googlemaps' },
  { key: 'maplibre-demo', label: 'Maplibre Demotiles', icon: 'i-simple-icons-maplibre' },
  { key: 'dataviz', label: 'MapTiler Dataviz', icon: 'i-simple-icons-maptiler' },
  { key: 'streets', label: 'MapTiler Streets', icon: 'i-simple-icons-maptiler' },
  { key: 'satellite', label: 'MapTiler Satellite', icon: 'i-simple-icons-maptiler' },
] as const;

const items = computed<DropdownMenuItem[]>(() =>
  styleOptions.map(option => ({
    label: option.label,
    icon: option.icon,
    checked: style.value === option.key,
    onUpdateChecked: () => style.value = option.key,
    type: 'checkbox' as const,
  }))
);
</script>
<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-between items-center px-4 py-2">
      <h1 class="text-2xl">MapLibre ❤️ Nuxt</h1>
      <div class="flex gap-2">
        <ColorChooser />
        <UDropdownMenu :items>
          <UButton label="Map Provider" color="neutral" variant="outline" icon="i-lucide-menu" />
        </UDropdownMenu>
      </div>
    </div>
    <div class="flex-grow">
      <LocationChooser class="rounded" :map-style="styleMap[style]" />
    </div>
  </div>
</template>
