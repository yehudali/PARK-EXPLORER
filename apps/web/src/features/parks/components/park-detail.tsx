import { Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays, MapPin, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { ParkDetail as ParkDetailData } from '../types'

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
}: {
  park: ParkDetailData
  isOwner: boolean
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
        <h1
          dir="auto"
          className="text-3xl font-semibold tracking-tight text-balance"
        >
          {park.name}
        </h1>
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
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border bg-card p-4">
          <div className="flex gap-8">
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
          <span className="max-w-64 text-xs leading-relaxed text-muted-foreground">
            A map preview replaces these numbers in Stage E.
          </span>
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
