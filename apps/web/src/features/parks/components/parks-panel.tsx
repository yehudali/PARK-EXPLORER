import { getRouteApi } from '@tanstack/react-router'
import { SearchX, TreePine } from 'lucide-react'
import { QueryState } from '@/components/common/query-state'
import { StatePanel } from '@/components/common/state-panel'
import { Button } from '@/components/ui/button'
import { useParks } from '../hooks/useParks'
import { ParkList } from './park-list'
import { ParkListSkeleton } from './park-list-skeleton'

const route = getRouteApi('/_authenticated/')

// The left pane of the main screen: the one place that joins the query to the
// display components. Everything below it takes props.
export function ParksPanel() {
  const filters = route.useSearch()
  const navigate = route.useNavigate()
  const parks = useParks(filters)

  const isFiltered = Boolean(
    filters.search || filters.regionId || filters.cityId,
  )

  return (
    <QueryState
      query={parks}
      skeleton={<ParkListSkeleton />}
      errorTitle="Could not load parks"
      isEmpty={(data) => data.length === 0}
      // Two different empty states, because they call for two different
      // answers: create the first park, or widen the filter.
      empty={
        isFiltered ? (
          <StatePanel
            icon={SearchX}
            title="No parks match this filter"
            description="Nothing here fits the search and filters you chose."
            action={
              <Button variant="outline" onClick={() => navigate({ search: {} })}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <StatePanel
            icon={TreePine}
            title="No parks yet"
            description="Nothing has been added to the system. Be the first."
          />
        )
      }
    >
      {(data) => <ParkList parks={data} />}
    </QueryState>
  )
}
