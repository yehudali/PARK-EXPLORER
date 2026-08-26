import { trpc } from '@/lib/trpc'

// The one place the park list is fetched. Components take parks as props; this
// is what they are handed from.
export function useParks() {
  return trpc.parksRouter.findAll.useQuery()
}
