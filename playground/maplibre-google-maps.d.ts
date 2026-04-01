declare module 'maplibre-google-maps' {
  import type { StyleSpecification } from 'maplibre-gl'

  export function createGoogleStyle(protocol: string, mapType: string, apiKey: string): StyleSpecification
  export function googleProtocol(params: { url: string }, abortController: AbortController): Promise<{ data: ArrayBuffer }>
}
