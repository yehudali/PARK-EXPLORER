import { trpc } from '@/lib/trpc'

// D9, in three hooks: after a change, invalidate the narrowest thing that
// changed. No direct cache writes, no optimistic updates - the server stays the
// only source of truth, and the list refetches itself.

export function useCreatePark() {
  const utils = trpc.useUtils()

  return trpc.parksRouter.create.useMutation({
    onSuccess: () => {
      // A new park can match any filter, so the whole list is now suspect.
      void utils.parksRouter.findAll.invalidate()
    },
  })
}

export function useUpdatePark() {
  const utils = trpc.useUtils()

  return trpc.parksRouter.update.useMutation({
    onSuccess: (park) => {
      void utils.parksRouter.findAll.invalidate()
      // And this one park, which the detail screen may be showing right now.
      void utils.parksRouter.findById.invalidate({ id: park.id })
    },
  })
}

export function useDeletePark() {
  const utils = trpc.useUtils()

  return trpc.parksRouter.remove.useMutation({
    onSuccess: () => {
      void utils.parksRouter.findAll.invalidate()
    },
  })
}
