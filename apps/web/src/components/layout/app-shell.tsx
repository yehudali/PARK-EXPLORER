import type { ReactNode } from 'react'
import { TopBar } from './top-bar'

// The frame every screen sits in: a real top bar, and a content area that takes
// exactly the rest of the viewport - so a screen can split itself without the
// page growing a scrollbar.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <TopBar />
      <main className="min-h-0 grow">{children}</main>
    </div>
  )
}
