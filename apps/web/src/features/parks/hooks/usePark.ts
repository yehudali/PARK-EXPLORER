import { trpc } from '@/lib/trpc'

// One park by id. The id comes from the address, so this runs on a cold load of
// a pasted link exactly as it does after a click in the list.
export function usePark(id: string) {
  return trpc.parksRouter.findById.useQuery({ id })
}
