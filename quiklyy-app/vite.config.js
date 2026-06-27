import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png', 'illustration.png'],
      manifest: {
        short_name: 'Quiklyy',
        name: 'Quiklyy - Local Deals',
        icons: [
          {
            src: '/favicon.svg',
            type: 'image/svg+xml',
            sizes: '512x512'
          },
          {
            src: '/logo.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: '/logo.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable'
          }
        ],
        start_url: '/',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        theme_color: '#004067',
        orientation: 'portrait'
      }
    })
  ],
})
