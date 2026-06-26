<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const pages: NavigationMenuItem[] = [
  { label: 'Home', icon: 'i-lucide-house', to: '/' },
  { label: 'Markers', icon: 'i-lucide-map-pin', to: '/map/markers' },
  { label: 'Sources & Layers', icon: 'i-lucide-layers', to: '/map/sources' },
  { label: 'Controls', icon: 'i-lucide-sliders-horizontal', to: '/map/controls' },
]

const route = useRoute()
const currentPage = computed(() => pages.find(page => page.to === route.path) ?? pages[0])

const { styles, selectedKey } = useMapStyle()
</script>
<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible>
      <template #header>
        <span class="font-bold text-lg">MapLibre + Nuxt</span>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="pages"
          orientation="vertical"
          :ui="{ link: collapsed ? 'justify-center' : undefined }"
        />

        <div v-if="!collapsed" class="mt-4 pt-4 border-t border-(--ui-border)">
          <p class="text-xs font-medium text-(--ui-text-muted) px-2 mb-2">Map Provider</p>
          <div class="flex flex-col gap-0.5">
            <UButton
              v-for="s in styles"
              :key="s.key"
              :icon="s.icon"
              :label="s.label"
              :variant="selectedKey === s.key ? 'solid' : 'ghost'"
              color="neutral"
              size="sm"
              class="justify-start"
              @click="selectedKey = s.key"
            />
          </div>
        </div>
      </template>

      <template #footer="{ collapsed }">
        <div class="flex items-center" :class="collapsed ? 'justify-center' : 'justify-between'">
          <UButton
            to="https://marr.github.io/nuxt-maplibre"
            target="_blank"
            :icon="collapsed ? 'i-lucide-book-open' : 'i-lucide-external-link'"
            :label="collapsed ? undefined : 'Docs'"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <ColorChooser v-if="!collapsed" />
        </div>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel
      id="playground-main"
      :ui="{ body: 'flex flex-1 flex-col min-h-0 overflow-hidden p-0' }"
    >
      <template #header>
        <UDashboardNavbar
          :title="currentPage.label"
          :icon="currentPage.icon"
        />
      </template>

      <template #body>
        <div class="playground-map-host relative min-h-0 flex-1 w-full">
          <slot />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
