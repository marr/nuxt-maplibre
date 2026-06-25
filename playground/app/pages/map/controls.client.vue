<script setup lang="ts">
const { current } = useMapStyle()
</script>
<template>
  <div class="playground-controls-map h-full min-h-[50vh] w-full">
    <MglMap
      :map-style="current.style"
      :zoom="2"
      :attribution-control="{ compact: true }"
    >
      <MglLogoControl position="top-left" />
      <MglNavigationControl />
      <MglFullscreenControl />
      <MglScaleControl />
      <MglGeolocateControl />
    </MglMap>
  </div>
</template>
