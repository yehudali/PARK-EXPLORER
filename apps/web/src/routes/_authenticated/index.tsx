import { createFileRoute } from '@tanstack/react-router'
import { MapPlaceholder } from '@/components/common/map-placeholder'
import { TwoPane } from '@/components/layout/two-pane'
import { ParksPanel } from '@/features/parks/components/parks-panel'

export const Route = createFileRoute('/_authenticated/')({
  component: () => (
    <TwoPane left={<ParksPanel />} right={<MapPlaceholder />} />
  ),
})
