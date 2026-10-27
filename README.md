[![@dmarr/nuxt-maplibre](./docs/public/cover.png)](https://marr.github.io/nuxt-maplibre)

# Nuxt MapLibre

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module to use MapLibre.
It was made using [vue-maplibre-gl](https://indoorequal.github.io/vue-maplibre-gl/) which is a Vue 3 wrapper for [MapLibre](https://maplibre.org/), that exposes the original MapLibre API as Vue components.

This module is really just about making it work with Nuxt without the need to configure anything.

> Fork of [Gugustinette/nuxt-maplibre](https://github.com/Gugustinette/nuxt-maplibre) with additional features and improvements.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://marr.github.io/nuxt-maplibre)

## Features

- ⚡ &nbsp;No configuration needed
- 🦺 &nbsp;Typescript support
- 🚠 &nbsp;Auto import
- 🎨 &nbsp;Configurable CSS (maplibre-theme by default, with opt-out support)
- 🗺️ &nbsp;Google Maps tiles support

## Quick Setup

```bash
npx nuxi@latest module add @dmarr/nuxt-maplibre
```

That's it! You can now use MapLibre in your Nuxt app ✨

## Usage

For a complete list of the components available, check out the [vue-maplibre-gl documentation](https://indoorequal.github.io/vue-maplibre-gl/examples/basic.html).

### Basic

```vue
<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

<script setup>
const style = 'https://demotiles.maplibre.org/style.json';
const center = [-1.559482, 47.21322];
const zoom = 8;
</script>
```

### Configuration

By default, the module uses `maplibre-theme/modern.css` for a modern look. You can customize this in `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ["@dmarr/nuxt-maplibre"],
  maplibre: {
    // Use maplibre-gl's default styles instead
    css: 'maplibre-gl/dist/maplibre-gl.css',
    // Or disable CSS injection entirely
    // css: false,
  },
});
```

## Upgrading from v2

**v3** ships **maplibre-gl 6** and **vue-maplibre-gl 9**. That is a major MapLibre upgrade, not just a patch bump for this module.

1. Bump `@dmarr/nuxt-maplibre` to v3 and reinstall so your lockfile picks up the new MapLibre stack.
2. If your app imports `maplibre-gl` directly (alongside `Mgl*` components), replace default imports with [named or namespace imports](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/#imports). The playground in this repo uses `import { LngLat, addProtocol } from 'maplibre-gl'`.
3. Review MapLibre’s [v5 → v6 migration guide](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/) for map styles, events, GeoJSON handling, WebGL2, and any custom layers or workers.

Component-only usage (`MglMap`, controls, sources, layers) often needs no code changes; custom MapLibre integration and styles are where v6 breaks most often.

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@dmarr/nuxt-maplibre/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://www.npmjs.com/package/@dmarr/nuxt-maplibre

[npm-downloads-src]: https://img.shields.io/npm/dm/@dmarr/nuxt-maplibre.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://www.npmjs.com/package/@dmarr/nuxt-maplibre

[license-src]: https://img.shields.io/npm/l/@dmarr/nuxt-maplibre.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://www.npmjs.com/package/@dmarr/nuxt-maplibre

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
