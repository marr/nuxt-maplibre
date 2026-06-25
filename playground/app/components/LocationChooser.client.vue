<script setup lang="ts">
import maplibre from "maplibre-gl";
import type { LngLatLike, StyleSpecification } from "maplibre-gl";

const { LngLat } = maplibre;
const { mapStyle } = defineProps<{
  mapStyle: string | StyleSpecification | undefined;
}>();

const center = ref<LngLatLike>([-70.99472213822588, 42.37041979229858]);
const coordinates = ref<LngLatLike>([-70.84961090021761, 42.262697082725936]);
const zoom = ref(10);
</script>
<template>
  <MglMap
    :map-style
    v-model:center="center"
    v-model:zoom="zoom"
    :attribution-control="{ compact: true }"
  >
    <MglNavigationControl />
    <MglMarker draggable v-model:coordinates="coordinates">
      <MglPopup
        ref="popup"
        anchor="bottom"
        :offset="[0, -40]"
        class-name="playground-marker-popup"
        max-width="none"
        :close-button="false"
        :close-on-click="false"
      >
        <MarkerPopupContent :coordinates="coordinates" />
      </MglPopup>
    </MglMarker>
    <MglCustomControl position="bottom-left">
      <MapControl>
        <p class="text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide mb-2">Map Info</p>
        <div class="space-y-1.5">
          <div class="flex justify-between items-center gap-2">
            <span class="text-(--ui-text-muted)">Marker</span>
            <span class="font-mono text-xs">{{ LngLat.convert(coordinates).lat.toFixed(4) }}, {{ LngLat.convert(coordinates).lng.toFixed(4) }}</span>
          </div>
          <div class="flex justify-between items-center gap-2">
            <span class="text-(--ui-text-muted)">Center</span>
            <span class="font-mono text-xs">{{ LngLat.convert(center).lat.toFixed(4) }}, {{ LngLat.convert(center).lng.toFixed(4) }}</span>
          </div>
          <div class="flex justify-between items-center gap-2">
            <span class="text-(--ui-text-muted)">Zoom</span>
            <span class="font-mono text-xs">{{ zoom.toFixed(2) }}</span>
          </div>
        </div>
      </MapControl>
    </MglCustomControl>
  </MglMap>
</template>
