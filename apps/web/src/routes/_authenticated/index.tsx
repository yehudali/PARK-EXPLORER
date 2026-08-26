import { createFileRoute } from '@tanstack/react-router'
import { MapPlaceholder } from '@/components/common/map-placeholder'
import { TwoPane } from '@/components/layout/two-pane'
import { ParkFilters } from '@/features/filters/components/park-filters'
import { parkFiltersSchema } from '@/features/filters/schemas'
import { ParksPanel } from '@/features/parks/components/parks-panel'

export const Route = createFileRoute('/_authenticated/')({
  // The search and the filters are the address, not component state (D11).
  validateSearch: (search) => parkFiltersSchema.parse(search),
  component: () => (
    <div className="flex h-full min-h-0 flex-col">
      <ParkFilters />
      <div className="min-h-0 flex-grow">
        <TwoPane left={<ParksPanel />} right={<MapPlaceholder />} />
      </div>
    </div>
  ),
})
