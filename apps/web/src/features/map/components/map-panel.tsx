import { getRouteApi } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'
import { messageFor } from '@/lib/errors'
import { toFilters } from '@/features/filters/schemas'
import { useParks } from '@/features/parks/hooks/useParks'
import { useParkSelection } from '@/features/parks/hooks/useParkSelection'
import { ParkMap } from './park-map'

const route = getRouteApi('/_authenticated/')

// The right pane's single joining point, mirroring ParksPanel on the left: the
// one component here that reads a query and the address. ParkMap below it takes
// props only.
//
// E5 - it calls the same hook with the same filters as the list, so the two
// panes share one cache entry and one request. Selecting a park is deliberately
// not part of that key; see the note in the filters schema.
export function MapPanel() {
  const search = route.useSearch()
  const parks = useParks(toFilters(search))
  const { selectedId, select } = useParkSelection()

  // Unlike the list, the map is not wrapped in QueryState. The tiles do not
  // depend on the query, and unmounting the map on every loading or error state
  // would re-initialise Leaflet each time - measuring the container again, and
  // throwing away the user's pan and zoom. So the map stays mounted and the
  // states are drawn over it.
  return (
    <div className="relative h-full">
      <ParkMap
        parks={parks.data ?? []}
        selectedId={selectedId}
        onSelect={select}
      />

      {parks.isError && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm shadow-sm">
            <TriangleAlert className="size-4 shrink-0 text-destructive" />
            <span className="text-muted-foreground">
              {messageFor(parks.error)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
