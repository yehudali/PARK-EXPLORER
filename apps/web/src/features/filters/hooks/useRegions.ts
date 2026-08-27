import { trpc } from '@/lib/trpc'

// Reference data that does not change while anyone is looking at it, so it is
// fetched once and never goes stale (the §7 table).
export function useRegions() {
  return trpc.regionsRouter.findAll.useQuery(undefined, {
    staleTime: Infinity,
  })
}
