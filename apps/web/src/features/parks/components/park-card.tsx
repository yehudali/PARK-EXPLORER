import { MapPin } from 'lucide-react'
import type { Park } from '../types'

// Display only - it is handed a park and draws it. No query, no router, so the
// same card works in the list today and inside the map popup in Stage E.
//
// dir="auto" on every field that holds user text: the interface is English and
// left to right, but the parks themselves are named in Hebrew, and without it
// the icons and punctuation end up on the wrong side.
export function ParkCard({ park }: { park: Park }) {
  const openedYear = park.openingDate?.slice(0, 4)

  return (
    <article className="flex flex-col gap-2 rounded-lg border bg-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 dir="auto" className="text-base font-semibold tracking-tight">
          {park.name}
        </h3>
        {openedYear && (
          <span className="shrink-0 text-xs text-muted-foreground">
            Opened {openedYear}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="size-3.5 shrink-0" />
        <span dir="auto">{park.cityName}</span>
      </div>

      {park.description && (
        <p
          dir="auto"
          className="text-sm leading-relaxed text-muted-foreground text-pretty"
        >
          {park.description}
        </p>
      )}
    </article>
  )
}
