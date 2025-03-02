import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools()
  ],
  optimizeDeps: {
    include: [
      '@fullcalendar/core',
      '@fullcalendar/vue3',
      '@fullcalendar/daygrid',
      '@fullcalendar/interaction',
      '@fullcalendar/bootstrap5'
    ]
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: mode === 'development' // Only enable DevTools in dev mode
  }
}))