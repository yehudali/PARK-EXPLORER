import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // בא לפתור את הבעיה עם shadcn. הוא אומר ל-Vite: בכל פעם שקוד כלשהו כותב ייבוא שמתחיל בסימן שטרודל, תתרגם את זה בפועל לנתיב המלא של תיקיית src
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})