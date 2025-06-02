<script setup lang="ts">
import maplibregl from 'maplibre-gl';
import MaplibreInspect from '@maplibre/maplibre-gl-inspect';

const InspectControl = defineComponent({
  setup(props: { position?: string }) {
    return useMglControl(
      () => {
        return new MaplibreInspect({
          popup: new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
          })
        });
      }, {
        position: props.position || 'top-left'
      });
  },

  render() {
    return null;
  }
});
</script>
<template>
  <InspectControl />
</template>
<style>
@import "@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css";
</style>