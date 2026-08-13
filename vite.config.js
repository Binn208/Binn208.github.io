import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['maplibre-gl']
  },
  server: {
    proxy: {
      '/api/tiles': {
        target: 'https://gateway.datviet.ai',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://ankapong.com',
          'Referer': 'https://ankapong.com/'
        }
      },
      '/font': {
        target: 'https://gateway.datviet.ai',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://ankapong.com',
          'Referer': 'https://ankapong.com/'
        }
      }
    }
  }
});
