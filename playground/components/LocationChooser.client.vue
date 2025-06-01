
<script setup lang="ts">
import { LngLat, type LngLatLike, type StyleSpecification } from 'maplibre-gl';

const { mapStyle } = defineProps<{
  mapStyle: string | StyleSpecification | undefined;
}>();

const defaultCoordinates: LngLatLike = [-71.058, 42.357];
const center = ref<LngLatLike>(defaultCoordinates);
const coordinates = ref<LngLatLike>(defaultCoordinates);
LngLat

</script>
<template>
  <MglMap :map-style v-model:center="center" :zoom="14" >
    <MglNavigationControl />
    <MglMarker draggable v-model:coordinates="coordinates" />
    <MglCustomControl position="bottom-left">
      <div class="p-2">
        <h3 class="text-lg font-semibold">Map data:</h3>
        <p>Marker: {{ LngLat.convert(coordinates) }}</p>
        <p>Map center: {{ LngLat.convert(center) }}</p>
      </div>
    </MglCustomControl>
  </MglMap>
</template>