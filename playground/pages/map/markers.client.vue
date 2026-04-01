<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl'

const { current } = useMapStyle()

const center = ref<LngLatLike>([-70.99472213822588, 42.37041979229858])
const zoom = ref(10)
const marker = ref<LngLatLike>([-70.84961090021761, 42.262697082725936])
const draggable = ref(true)
</script>
<template>
  <MglMap
    v-model:center="center"
    v-model:zoom="zoom"
    :map-style="current.style"
    :attribution-control="{ compact: true }"
  >
    <MglNavigationControl />
    <MglMarker v-model:coordinates="marker" :draggable="draggable">
      <MglPopup
        anchor="bottom"
        :offset="[0, -40]"
        class-name="playground-marker-popup"
        max-width="none"
        :close-button="false"
        :close-on-click="false"
      >
        <MarkerPopupContent :coordinates="marker" title="Coordinates" />
      </MglPopup>
    </MglMarker>
    <MglCustomControl class="pointer-events-auto p-2" position="bottom-left">
      <DraggableToggle v-model:draggable="draggable" />
    </MglCustomControl>
  </MglMap>
</template>
