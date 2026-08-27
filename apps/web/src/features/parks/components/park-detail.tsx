import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays, MapPin, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ParkMap } from '@/features/map/components/park-map'
import type { ParkDetail as ParkDetailData } from '../types'

// The map takes a selection handler because the main screen needs one. Here
// there is one park and it is always the selected one, so there is nothing for
// a click to change.
const noSelectionChange = () => {}

function formatDate(isoDate: string) {
  // The server sends a plain date string and there is no converter on the way
  // in, so parse it here rather than assuming a Date arrived.
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Display only. Given a park, draws it - and is told whether the viewer owns it
// rather than working that out itself.
export function ParkDetail({
  park,
  isOwner,
  actions,
}: {
  park: ParkDetailData
  isOwner: boolean
  // A slot, not buttons: the screen owns the dialogs, this only says where they
  // sit. Keeps the component free of mutations.
  actions?: ReactNode
}) {
  const [longitude, latitude] = park.location.coordinates

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-12">
      <Link
        to="/"
        className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to parks
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1
            dir="auto"
            className="text-3xl font-semibold tracking-tight text-balance"
          >
            {park.name}
          </h1>
          {actions}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            <MapPin />
            <span dir="auto">{park.cityName}</span>
          </Badge>
          {park.openingDate && (
            <Badge variant="secondary">
              <CalendarDays />
              Opened {formatDate(park.openingDate)}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      {park.description && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            About
          </span>
          <p dir="auto" className="leading-relaxed text-muted-foreground text-pretty">
            {park.description}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Location
        </span>
        <div className="overflow-hidden rounded-lg border bg-card">
          {/* Leaflet measures this box the moment it initialises, so the height
              has to be a real number here rather than something the content
              decides. A box with no height of its own makes a map of zero size
              that stays that way. */}
          <div className="h-64 w-full sm:h-80">
            <ParkMap
              parks={[park]}
              selectedId={park.id}
              onSelect={noSelectionChange}
            />
          </div>

          <div className="flex gap-8 border-t p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Latitude</span>
              <span className="text-sm font-medium tabular-nums">
                {latitude.toFixed(4)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Longitude</span>
              <span className="text-sm font-medium tabular-nums">
                {longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="size-3.5" />
          Added by you
        </div>
      )}
    </div>
  )
}
