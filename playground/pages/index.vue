<script setup lang="ts">
const { current } = useMapStyle()
</script>
<template>
  <LocationChooser :map-style="current.style" />
</template>
