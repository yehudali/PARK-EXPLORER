import { Map } from 'lucide-react'

// Stands in for the map until Stage E. Deleting this component is the whole of
// what Stage E replaces in this pane.
export function MapPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="flex max-w-80 flex-col items-center gap-3 text-center">
        <Map className="size-8 text-muted-foreground/50" />
        <span className="text-sm font-medium text-muted-foreground">Map pane</span>
        <span className="text-xs leading-relaxed text-muted-foreground/80">
          Reserved for Stage E. The split exists from day one so the layout is
          not rebuilt later.
        </span>
      </div>
    </div>
  )
}
