import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    allowedHosts: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8002',
        changeOrigin: true,
      },
      '/static': {
        target: 'http://localhost:8002',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:8002',
        changeOrigin: true,
      }
    }
  }
})
