import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import 'maplibre-theme/icons.lucide.css';
import 'maplibre-theme/modern.css';

export default {
  extends: DefaultTheme
} satisfies Theme
