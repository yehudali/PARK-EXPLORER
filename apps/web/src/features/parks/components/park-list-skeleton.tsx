import { Skeleton } from '@/components/ui/skeleton'

// The shape of the list, not a spinner. Three cards is enough to read as "a
// list is coming" without the layout jumping when the real one lands.
export function ParkListSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-6" aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  )
}
