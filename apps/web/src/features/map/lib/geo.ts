import { geoJSON, type LatLngBoundsExpression, type LatLngExpression } from 'leaflet'
import type { GeoJsonObject } from 'geojson'

type Point = { coordinates: number[] }

// GeoJSON stores longitude first. Leaflet takes latitude first. Getting this
// backwards throws nothing at all - the park simply appears on another
// continent - so every hand-built coordinate goes through here and nowhere else.
//
// The boundary layer needs no equivalent: Leaflet's GeoJSON layer reads the
// standard correctly on its own, which is exactly why E12 uses it.
export function toLatLng(point: Point): LatLngExpression {
  const [longitude, latitude] = point.coordinates
  return [latitude, longitude]
}

// A throwaway layer, built only to be measured. It is never added to a map.
export function boundsOf(polygon: GeoJsonObject): LatLngBoundsExpression {
  return geoJSON(polygon).getBounds()
}
