import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/azure-learning/',
  plugins: [react()],
  define: {
    'process.env.IS_PREACT': JSON.stringify(false),
  },
  optimizeDeps: {
    include: ['@excalidraw/excalidraw'],
  },
})
