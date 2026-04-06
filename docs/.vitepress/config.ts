import { defineConfig } from 'vitepress'

/** Full URL so Demo is a real navigation, not VitePress client routing (static demo under /demo/ 404s in SPA). */
const demoUrl = 'https://marr.github.io/nuxt-maplibre/demo/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt MapLibre",
  description: "Documentation for the Nuxt MapLibre module",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  base: process.env.NODE_ENV === 'production' ? '/nuxt-maplibre/' : '/',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/getting-started/installation' },
      { text: 'Components', link: '/components/introduction' },
      { text: 'Demo', link: demoUrl, target: '_self' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Usage', link: '/getting-started/usage' },
          { text: 'Configuration', link: '/getting-started/configuration' },
          { text: 'Demo', link: demoUrl, target: '_self' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Introduction', link: '/components/introduction' },
        ]
      },
      {
        text: 'Composables',
        items: [
          { text: 'Introduction', link: '/composables/introduction' },
        ]
      },
      {
        text: 'About',
        items: [
          { text: 'Q&A', link: '/about/q&a' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/marr/nuxt-maplibre' },
      // { icon: 'npm', link: 'https://www.npmjs.com/package/nuxt-maplibre' }
    ],

    search: {
      provider: 'local',
    }
  },
  ignoreDeadLinks: true
})
