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

      <div className="flex min-h-0 flex-grow flex-col gap-3 overflow-y-auto px-6 pb-6">
        {parks.map((park) => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
    </div>
  )
}
