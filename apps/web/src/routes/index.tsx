import { createFileRoute } from '@tanstack/react-router'
import { MapPlaceholder } from '@/components/common/map-placeholder'
import { TwoPane } from '@/components/layout/two-pane'

export const Route = createFileRoute('/')({
  component: () => (
    <TwoPane
      left={
        <div className="p-6 text-sm text-muted-foreground">
          The park list arrives in D.3.
        </div>
      }
      right={<MapPlaceholder />}
    />
  ),
})
