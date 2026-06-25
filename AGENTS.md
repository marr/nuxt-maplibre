# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single product: the `@dmarr/nuxt-maplibre` Nuxt module, exercised through the `playground/` Nuxt demo app. There is no backend, database, or Docker — everything runs as a single Nuxt dev server (client-side mapping). Standard commands live in `README.md` and `package.json` scripts; the notes below only cover non-obvious caveats.

### Running / testing

- Always run `pnpm run dev:prepare` before `lint`, `test`, or `dev`. It stubs the module and generates `playground/.nuxt/tsconfig.json`, which the root `tsconfig.json` extends; lint/typecheck/test fail without it. (The startup update script already runs `dev:prepare`.)
- `pnpm run dev` serves the playground at `http://localhost:3000/`. Use `pnpm run dev:host` to expose on the network.
- `pnpm run test` (Vitest) boots an in-process Nuxt fixture server — no external services needed.

### Map tiles / API keys (important gotcha)

- The playground defaults to the **MapTiler** provider, which needs `NUXT_PUBLIC_MAP_TILER_KEY`. Keyless providers ("MapLibre Demotiles", "OpenFreeMap Liberty/Bright") are selectable from the sidebar "Map Provider" list and need only outbound internet, no key.
- `NUXT_PUBLIC_MAP_TILER_KEY` is a `NUXT_PUBLIC_*` value baked into the **client bundle at dev-server start**. If you set/receive the secret after the dev server is already running, you MUST restart `pnpm run dev` in a shell where the env var is present — hot reload will not pick it up, and the client will request MapTiler with an empty key and get HTTP 403.
- MapTiler keys are typically origin-restricted. The key must have `localhost` in its allowed domains/origins, or MapTiler returns `403 Key usage restricted`. A plain `curl` (no `Referer`) will 403 even for a valid localhost-restricted key; the browser works because it sends the `localhost` referer.
