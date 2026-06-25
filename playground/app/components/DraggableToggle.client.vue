<script setup lang="ts">
const draggable = defineModel<boolean>('draggable', { default: true })
</script>
<template>
  <MapControl>
    <UCheckbox v-model="draggable" label="Draggable" />
  </MapControl>
</template>
