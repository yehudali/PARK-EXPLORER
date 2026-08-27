import { DomEvent, type LeafletMouseEvent } from 'leaflet'
import type { GeoJsonObject } from 'geojson'
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvent,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Park } from '@/features/parks/types'
import { useIsDarkTheme } from '../hooks/useIsDarkTheme'
import { toLatLng } from '../lib/geo'
import {
  boundaryStyle,
  INITIAL_CENTER,
  INITIAL_ZOOM,
  markerRadius,
  markerStyle,
  TILE_ATTRIBUTION,
  TILE_MAX_ZOOM,
  TILE_SUBDOMAINS,
  TILE_URL,
} from '../constants'
import { FocusOnSelected } from './focus-on-selected'
import { ParkPopup } from './park-popup'

// E15. A separate component because map events are only reachable from inside
// the map, the same way FocusOnSelected is.
function ClearSelectionOnBackgroundClick({ onClear }: { onClear: () => void }) {
  useMapEvent('click', onClear)
  return null
}

type ParkMapProps = {
  parks: Park[]
  selectedId: string | undefined
  onSelect: (id: string | undefined) => void
}

// Display only (E4). It is handed what to draw and knows nothing about where
// the data came from - the rule ParkCard follows on the list side. That is what
// lets this same component be opened inside a dialog in Stage F.
//
// MapContainer is uncontrolled: the centre and zoom below are the opening view
// only. Every move after that is an imperative command from a child.
export function ParkMap({ parks, selectedId, onSelect }: ParkMapProps) {
  const isDark = useIsDarkTheme()
  const selected = parks.find((park) => park.id === selectedId)

  return (
    <MapContainer
      center={INITIAL_CENTER}
      zoom={INITIAL_ZOOM}
      scrollWheelZoom
      className="h-full w-full bg-muted"
    >
      {/* One url for both themes. The provider has no dark basemap, so the dark
          variant is made in CSS over the tile pane - see index.css. isDark below
          still drives the marker and boundary colours, which are real values
          Leaflet writes onto the SVG and cannot be filtered into place. */}
      <TileLayer
        url={TILE_URL}
        attribution={TILE_ATTRIBUTION}
        subdomains={TILE_SUBDOMAINS}
        maxZoom={TILE_MAX_ZOOM}
      />

      {/* Boundaries first: circle markers and boundaries share one Leaflet
          pane, so paint order here is what keeps the markers clickable on top
          of their own park. */}
      {parks.map((park) =>
        park.polygon ? (
          // E12. This layer reads its data once, when it mounts, and ignores
          // every later change - so the key has to carry the data's identity
          // and not just the park's. updatedAt moves whenever the boundary
          // could have, which is what makes the polygon redraw in Stage F.
          <GeoJSON
            key={`${park.id}:${park.updatedAt}`}
            data={park.polygon as GeoJsonObject}
            style={boundaryStyle(isDark, park.id === selectedId)}
          />
        ) : null,
      )}

      {parks.map((park) => (
        <CircleMarker
          key={park.id}
          center={toLatLng(park.location)}
          radius={markerRadius(park.id === selectedId)}
          pathOptions={markerStyle(isDark, park.id === selectedId)}
          eventHandlers={{
            click: (event: LeafletMouseEvent) => {
              // Leaflet fires a layer click at the map as well. Without this,
              // the handler above would clear the selection in the same click
              // that made it.
              DomEvent.stopPropagation(event.originalEvent)
              onSelect(park.id)
            },
          }}
        >
          <Popup minWidth={240} maxWidth={280}>
            <ParkPopup park={park} />
          </Popup>
        </CircleMarker>
      ))}

      <ClearSelectionOnBackgroundClick onClear={() => onSelect(undefined)} />
      <FocusOnSelected park={selected} />
    </MapContainer>
  )
}
