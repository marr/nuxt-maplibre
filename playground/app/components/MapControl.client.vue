<script setup lang="ts">
const colorMode = useResolvedColorMode()
</script>

<template>
  <div
    class="playground-map-panel p-3 rounded-lg shadow-lg text-sm"
    :class="colorMode === 'dark' ? 'light bg-white/90' : 'bg-elevated'"
  >
    <slot />
  </div>
</template>
