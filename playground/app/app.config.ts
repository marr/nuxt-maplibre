export default defineAppConfig({
  ui: {
    dashboardPanel: {
      slots: {
        // Full-bleed map demos: no padded scroll area around page content.
        body: 'flex flex-1 flex-col min-h-0 overflow-hidden p-0',
        root: 'relative flex flex-col min-w-0 min-h-0 flex-1 overflow-hidden lg:not-last:border-e lg:not-last:border-default',
      },
    },
  },
})
