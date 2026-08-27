import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Park } from '../types'

// Display only - it is handed a park and draws it. No query, no router, so the
// same card works in the list and inside the map popup (E8).
//
// dir="auto" on every field that holds user text: the interface is English and
// left to right, but the parks themselves are named in Hebrew, and without it
// the icons and punctuation end up on the wrong side.
export function ParkCard({
  park,
  selected = false,
}: {
  park: Park
  selected?: boolean
}) {
  const openedYear = park.openingDate?.slice(0, 4)

  return (
    <article
      className={cn(
        'flex h-full flex-col gap-2 rounded-lg border bg-card p-4 transition-colors',
        selected
          ? 'border-primary bg-accent/40'
          : 'hover:border-primary/40',
      )}
    >
      {/* The right padding reserves room for the details control the list
          places over this corner. */}
      <div className="flex items-baseline justify-between gap-3 pr-7">
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
