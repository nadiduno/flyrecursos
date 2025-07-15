import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, 
      filename: 'dist/bundle-analysis.html', 
    }),
  ],
  build: {
    sourcemap: true, 
  },
  server: {
  port: 3000,
  }
})
