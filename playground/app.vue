<template>
  <div id="app">
    <UVerticalNavigation
      :links="links"
      style="min-width: 120px"
    />
    <div id="actual-page">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [{
  label: 'MapTiler',
  icon: 'i-simple-icons-maplibre',
  to: { path: '/', query: { provider : 'maptiler' }}
}, {
  label: 'Google',
  icon: 'i-simple-icons-googlemaps',
  to: { path: '/', query: { provider : 'google' }}
}]
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #020420;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

a {
  color: #00DC82;
}

#app {
  display: flex;
  flex-direction: row;
  height: 100svh;
  width: 100vw;
}

#actual-page {
  width: 100%;
}

#actual-page > div {
  height: 100%;
}
</style>
