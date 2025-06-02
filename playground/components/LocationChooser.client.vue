<script setup lang="ts">
import maplibre from "maplibre-gl";
import MaplibreInspect from "@maplibre/maplibre-gl-inspect";
import type { LngLatLike, StyleSpecification } from "maplibre-gl";

const { LngLat } = maplibre;
const { mapStyle } = defineProps<{
  mapStyle: string | StyleSpecification | undefined;
}>();

const center = ref<LngLatLike>([-71.40949443678494, 42.39729363467626]);
const coordinates = ref<LngLatLike>([-70.84961090021761, 42.262697082725936]);
LngLat;
const zoom = ref(8);
</script>
<template>
  <MglMap :map-style v-model:center="center" v-model:zoom="zoom">
    <MglNavigationControl />
    <MglMarker draggable v-model:coordinates="coordinates">
      <MglPopup ref="popup" close-button>
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
    <MapInspector position="top-right" />
  </MglMap>
</template>
