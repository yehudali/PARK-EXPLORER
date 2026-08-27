import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  // The router plugin has to run before the react plugin: it rewrites the route
  // files, and react() has to see the rewritten version.
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    // Fixes the shadcn import problem. Tells Vite: whenever code writes an import starting with the at sign, resolve it to the full path of the src directory
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})