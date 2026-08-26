import type { ReactNode } from 'react'

// The main screen is two panes from day one. Stage E fills the right one with
// the map; until then it is deliberately empty rather than absent, so the
// layout is not rebuilt later.
export function TwoPane({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-full shrink-0 flex-col md:w-115 md:border-r">
        {left}
      </div>
      {/* Below md the map pane is dropped rather than squeezed. The List/Map
          switch the mockup shows at phone width lands with the real list. */}
      <div className="hidden min-w-0 grow bg-muted md:block">{right}</div>
    </div>
  )
}
