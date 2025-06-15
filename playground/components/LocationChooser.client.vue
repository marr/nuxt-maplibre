<script setup lang="ts">
import maplibre from "maplibre-gl";
import type { LngLatLike, StyleSpecification } from "maplibre-gl";

const { LngLat } = maplibre;
const { mapStyle } = defineProps<{
  mapStyle: string | StyleSpecification | undefined;
}>();

const center = ref<LngLatLike>([-70.99472213822588, 42.37041979229858]);
const coordinates = ref<LngLatLike>([-70.84961090021761, 42.262697082725936]);
LngLat;
const zoom = ref(10);
</script>
<template>
  <MglMap :map-style v-model:center="center" v-model:zoom="zoom" @map:idle="console.log('Map idle')">
    <MglNavigationControl />
    <MglMarker draggable v-model:coordinates="coordinates">
      <MglPopup ref="popup" :close-button="false">
        <div class="p-2">
          <h3 class="text-lg font-semibold">Marker Info</h3>
          <p>Coordinates: {{ LngLat.convert(coordinates) }}</p>
        </div>
      </MglPopup>
    </MglMarker>
    <MglCustomControl position="bottom-left">
      <div class="p-2">
        <h3 class="text-lg font-semibold">Map data:</h3>
        <p>Marker: {{ LngLat.convert(coordinates) }}</p>
        <p>Map center: {{ LngLat.convert(center) }}</p>
        <p>Map zoom: {{ zoom }}</p>
      </div>
    </MglCustomControl>
  </MglMap>
</template>
