<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { googleProtocol, createGoogleStyle } from "maplibre-google-maps";
import type { LngLatLike } from "maplibre-gl";

maplibregl.addProtocol("google", googleProtocol);

const { mapProvider = '' } = defineProps<{ mapProvider: string }>();
const { mapTilerKey, googleMapTilesApiKey } = useRuntimeConfig().public;

const style = computed(() => {
  if (!mapProvider || mapProvider === "maptiler") {
    return `https://api.maptiler.com/maps/satellite/style.json?key=${mapTilerKey}`;
  } else if (mapProvider === "google") {
    return createGoogleStyle("google", "satellite", googleMapTilesApiKey);
  }
  return `https://api.maptiler.com/maps/dataviz/style.json?key=${mapTilerKey}`;
});
const center = ref<LngLatLike>([-70.8443, 42.3680]);
const zoom = 9.7;

const map = useMglMap();
console.log(map.isLoaded)
console.log(map.isMounted)
console.log(map.instance)
console.log(map.map)
</script>
