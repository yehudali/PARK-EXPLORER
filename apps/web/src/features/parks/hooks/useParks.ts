import { keepPreviousData } from '@tanstack/react-query'
import { trpc } from '@/lib/trpc'
import type { ParkFilters } from '@/features/filters/schemas'

// The one place the park list is fetched. Components take parks as props; this
// is what they are handed from.
export function useParks(filters: ParkFilters) {
  return trpc.parksRouter.findAll.useQuery(filters, {
    // Every change of filter is a new cache key, and a new key would normally
    // empty the list while it loads. This keeps the previous answer on screen
    // until the new one arrives, so the list never blinks.
    placeholderData: keepPreviousData,
  })
}
