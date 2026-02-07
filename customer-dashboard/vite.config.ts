import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/customer-dashboard/',
  build: {
    outDir: '_build',
    emptyOutDir: true,
  },
})
