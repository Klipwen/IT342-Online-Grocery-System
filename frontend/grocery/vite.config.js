import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Change this for each developer if needed
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Change this to match backend port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
