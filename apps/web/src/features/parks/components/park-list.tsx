import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { ParkCard } from './park-card'
import type { Park } from '../types'

// Display only, like the card. It is given the parks it should draw, which one
// is selected, and what to call when that should change.
export function ParkList({
  parks,
  selectedId,
  onSelect,
}: {
  parks: Park[]
  selectedId: string | undefined
  onSelect: (id: string) => void
}) {
  const selectedRef = useRef<HTMLDivElement>(null)

  // E16: picking a park on the map brings its row into view here. block:
  // 'nearest' means a row that is already visible does not move, so clicking in
  // the list itself does not make the list jump under the cursor.
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedId])

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex items-baseline justify-between px-6 pt-4 pb-3">
        <span className="text-sm font-medium">
          {parks.length} {parks.length === 1 ? 'park' : 'parks'}
        </span>
      </div>

      <div className="flex min-h-0 grow flex-col gap-3 overflow-y-auto px-6 pb-6">
        {parks.map((park) => {
          const isSelected = park.id === selectedId

          return (
            // E7: the row's own click selects the park and focuses the map -
            // that is what the stage requires of it - so opening the details is
            // a second, explicit control. The two are siblings rather than
            // nested, because a link inside a button is neither valid nor
            // reachable by keyboard.
            <div
              key={park.id}
              ref={isSelected ? selectedRef : undefined}
              className="relative"
            >
              <button
                type="button"
                onClick={() => onSelect(park.id)}
                aria-pressed={isSelected}
                className="block w-full cursor-pointer rounded-lg text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <ParkCard park={park} selected={isSelected} />
              </button>

              <Link
                to="/parks/$id"
                params={{ id: park.id }}
                aria-label={`View details for ${park.name}`}
                title="View details"
                className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <ChevronRight className="size-4" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
