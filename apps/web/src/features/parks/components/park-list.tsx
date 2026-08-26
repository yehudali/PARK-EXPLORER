import { Link } from '@tanstack/react-router'
import { ParkCard } from './park-card'
import type { Park } from '../types'

// Display only, like the card. It is given the parks it should draw.
export function ParkList({ parks }: { parks: Park[] }) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex items-baseline justify-between px-6 pt-4 pb-3">
        <span className="text-sm font-medium">
          {parks.length} {parks.length === 1 ? 'park' : 'parks'}
        </span>
      </div>

      <div className="flex min-h-0 grow flex-col gap-3 overflow-y-auto px-6 pb-6">
        {/* The link lives here, not in the card - so the card stays usable
            inside the map popup in Stage E, where it links nowhere. */}
        {parks.map((park) => (
          <Link
            key={park.id}
            to="/parks/$id"
            params={{ id: park.id }}
            className="rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ParkCard park={park} />
          </Link>
        ))}
      </div>
    </div>
  )
}
