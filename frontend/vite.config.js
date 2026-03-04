import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When running inside Docker Compose, VITE_BACKEND_PROXY_URL is set to the
// backend service URL (e.g. http://backend:8000). The Vite dev server then
// forwards /api requests to the backend, so the browser only needs to talk to
// the frontend container on port 3000.
const backendProxy = process.env.VITE_BACKEND_PROXY_URL || 'http://localhost:8000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: backendProxy,
        changeOrigin: true,
      },
    },
  },
})
