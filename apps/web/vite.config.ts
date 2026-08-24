import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Fixes the shadcn import problem. Tells Vite: whenever code writes an import starting with the at sign, resolve it to the full path of the src directory
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})