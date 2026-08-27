import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ParkCard } from '@/features/parks/components/park-card'
import type { Park } from '@/features/parks/types'

// E8: the marker click "allows reaching" the details rather than going there.
//
// This is where the Stage D decision to keep ParkCard free of router and query
// gets cashed in - the same card the list draws is drawn here, unchanged.
//
// The card renders inside Leaflet's own popup DOM. react-leaflet bridges that
// with a portal, so React context still reaches across, which is the only
// reason a router Link works in here at all.
export function ParkPopup({ park }: { park: Park }) {
  return (
    <div className="flex flex-col gap-2">
      <ParkCard park={park} />
      <Link
        to="/parks/$id"
        params={{ id: park.id }}
        className="flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        View details
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
