import { Skeleton } from '@/components/ui/skeleton'

// The shape of the detail screen, so nothing shifts when the park lands.
export function ParkDetailSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-12" aria-hidden="true">
      <Skeleton className="h-4 w-28" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-2/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <Skeleton className="h-20 w-full" />
    </div>
  )
}
