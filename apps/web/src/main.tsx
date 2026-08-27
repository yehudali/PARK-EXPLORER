import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.tsx'
import { applyTheme, readTheme } from './lib/theme.ts'

// Before the first render, so the page never flashes the wrong theme.
applyTheme(readTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)