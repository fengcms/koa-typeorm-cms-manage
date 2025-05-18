import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },

  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/upfiles': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
