import { trpc } from '@/lib/trpc'

// The dependent query. `enabled` is the whole mechanism: with no region chosen
// there is nothing sensible to ask for, so no request goes out at all.
export function useCities(regionId: string | undefined) {
  return trpc.citiesRouter.findByRegion.useQuery(
    { regionId: regionId ?? '' },
    {
      enabled: Boolean(regionId),
      staleTime: Infinity,
    },
  )
}
