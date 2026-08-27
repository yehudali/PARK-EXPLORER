import type { LatLngExpression } from 'leaflet'

// E9: the opening view is a fixed centre and zoom, not a frame around the data.
// Framing the data needs a fallback for zero parks and for a single park, and
// that fallback is this constant - so this alone is the whole decision.
export const INITIAL_CENTER: LatLngExpression = [31.5, 34.9]
export const INITIAL_ZOOM = 8

// E10: what focusing does when the park has no boundary to frame, and how long
// the animation runs. Short on purpose - a long one queues up visibly when
// several list rows are clicked in a row.
export const FOCUS_ZOOM = 15
export const FOCUS_DURATION = 0.6
export const FOCUS_PADDING: [number, number] = [48, 48]

// E3: CARTO basemaps. No key to manage, a dark variant that matches the app's
// own dark mode, and a pale style that leaves the parks the loudest thing on
// screen. The attribution is a licence condition, not decoration.
export const TILE_URL = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
} as const

export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export const TILE_SUBDOMAINS = 'abcd'
export const TILE_MAX_ZOOM = 20

// Leaflet writes these onto the SVG as presentation attributes, and var() is
// not resolved there - so the palette cannot be read from the CSS variables the
// rest of the app uses. These are the two --primary values from index.css.
// Keep the two in step, the same way the palette and the mockup are kept.
const PRIMARY = { light: '#14807c', dark: '#2fa6a0' } as const

// E11: a vector circle rather than a pin image, which sidesteps the broken
// marker-icon paths entirely. Selection is a radius and an opacity, nothing more.
export function markerRadius(isSelected: boolean) {
  return isSelected ? 10 : 6
}

export function markerStyle(isDark: boolean, isSelected: boolean) {
  const color = isDark ? PRIMARY.dark : PRIMARY.light
  return {
    color,
    weight: 2,
    fillColor: color,
    fillOpacity: isSelected ? 0.9 : 0.4,
  }
}

// E12: the boundary is filled faintly so overlapping parks stay readable, and
// the selected one is the same colour turned up rather than a different one.
export function boundaryStyle(isDark: boolean, isSelected: boolean) {
  const color = isDark ? PRIMARY.dark : PRIMARY.light
  return {
    color,
    weight: isSelected ? 3 : 2,
    opacity: isSelected ? 1 : 0.65,
    fillColor: color,
    fillOpacity: isSelected ? 0.3 : 0.1,
  }
}
