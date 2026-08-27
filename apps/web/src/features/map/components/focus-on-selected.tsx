import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { GeoJsonObject } from 'geojson'
import type { Park } from '@/features/parks/types'
import { FOCUS_DURATION, FOCUS_PADDING, FOCUS_ZOOM } from '../constants'
import { boundsOf, toLatLng } from '../lib/geo'

// The pattern this whole stage turns on. It draws nothing and returns null.
// Its only job is to turn a change in React state into an imperative Leaflet
// command - the map instance is not reachable through props, only through the
// context that useMap reads, which is why this has to be a child of the map
// rather than something ParkMap calls.
export function FocusOnSelected({ park }: { park: Park | undefined }) {
  const map = useMap()

  useEffect(() => {
    if (!park) return

    // E10: the boundary is the park; the point is only where it is. When there
    // is a boundary, frame it. Most parks have none, so the second branch is
    // the ordinary case rather than the fallback.
    if (park.polygon) {
      map.flyToBounds(boundsOf(park.polygon as GeoJsonObject), {
        padding: FOCUS_PADDING,
        duration: FOCUS_DURATION,
      })
    } else {
      map.flyTo(toLatLng(park.location), FOCUS_ZOOM, {
        duration: FOCUS_DURATION,
      })
    }
  }, [park, map])

  return null
}
