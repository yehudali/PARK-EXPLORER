import { createFileRoute } from '@tanstack/react-router'
import { TwoPane } from '@/components/layout/two-pane'
import { ParkFilters } from '@/features/filters/components/park-filters'
import { parkSearchSchema } from '@/features/filters/schemas'
import { MapPanel } from '@/features/map/components/map-panel'
import { ParksPanel } from '@/features/parks/components/parks-panel'

export const Route = createFileRoute('/_authenticated/')({
  // The filters and the selected park are the address, not component state
  // (D11, E6).
  validateSearch: (search) => parkSearchSchema.parse(search),
  component: () => (
    <div className="flex h-full min-h-0 flex-col">
      <ParkFilters />
      <div className="min-h-0 grow">
        <TwoPane left={<ParksPanel />} right={<MapPanel />} />
      </div>
    </div>
  ),
})
