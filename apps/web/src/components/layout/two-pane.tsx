import type { ReactNode } from 'react'

// The main screen is two panes from day one, which is why the right one held an
// empty placeholder rather than being absent before Stage E filled it with the
// map - the layout never had to be rebuilt.
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
