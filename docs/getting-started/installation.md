---
outline: deep
---

# Installation

## Automatic (Recommended)

```bash
npx nuxi@latest module add @dmarr/nuxt-maplibre
```

## Manual

- Add `@dmarr/nuxt-maplibre` dependency to your project

```bash
npm install @dmarr/nuxt-maplibre
```

- Add `@dmarr/nuxt-maplibre` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@dmarr/nuxt-maplibre'
  ]
})
```
