import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePWA from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/BrainMaster/', // This is the base path for your app on GitHub Pages
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'BrainMaster',
        short_name: 'BrainMaster',
        description: 'BrainMaster - Your Knowledge App',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png,jpg,ico}']  // Cache all assets like images and styles
      }
    })
  ]
});
