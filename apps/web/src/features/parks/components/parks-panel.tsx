import { TreePine } from 'lucide-react'
import { QueryState } from '@/components/common/query-state'
import { StatePanel } from '@/components/common/state-panel'
import { useParks } from '../hooks/useParks'
import { ParkList } from './park-list'
import { ParkListSkeleton } from './park-list-skeleton'

// The left pane of the main screen: the one place that joins the query to the
// display components. Everything below it takes props.
export function ParksPanel() {
  const parks = useParks()

  return (
    <QueryState
      query={parks}
      skeleton={<ParkListSkeleton />}
      errorTitle="Could not load parks"
      isEmpty={(data) => data.length === 0}
      empty={
        <StatePanel
          icon={TreePine}
          title="No parks yet"
          description="Nothing has been added to the system. Be the first."
        />
      }
    >
      {(data) => <ParkList parks={data} />}
    </QueryState>
  )
}
