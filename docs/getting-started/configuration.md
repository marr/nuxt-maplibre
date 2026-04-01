---
outline: deep
---

# Configuration

Nuxt Maplibre is designed to work with zero configuration.

For further control, options are exposed under the `maplibre` property in `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: ["@dmarr/nuxt-maplibre"],
  maplibre: {
    // Options
  },
});
```

## Module options

The following options can be used to customize the module's behavior.

### `css`

- Type: `string | string[] | false`
- Default: `'maplibre-theme/modern.css'`

Defines the styles that should be set globally.

These entries are added to the `css` array within `nuxt.config` and included on every page. See the [`nuxt.config` documentation](https://nuxt.com/docs/4.x/api/nuxt-config#css) for more information.

When set, the module also includes `maplibre-theme/icons.lucide.css` for Lucide icon support alongside the specified CSS entries.

Set to `false` to prevent the module from including any CSS files. This can be useful if MapLibre's style sheet is not needed on every page of your application.
