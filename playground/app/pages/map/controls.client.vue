<script setup lang="ts">
const { current } = useMapStyle()
</script>
<template>
  <div class="playground-controls-map h-full min-h-[50vh] w-full">
    <MglMap
      class="h-full min-h-[50vh] w-full"
      :map-style="current.style"
      :center="[0, 20]"
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
