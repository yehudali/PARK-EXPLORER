import { z } from 'zod'

// The filter state lives in the address (D11), which means anyone can type
// nonsense into it. Every field falls back instead of throwing, so a mangled
// link opens an unfiltered screen rather than an error one.
export const parkFiltersSchema = z.object({
  search: z.string().optional().catch(undefined),
  regionId: z.uuid().optional().catch(undefined),
  cityId: z.uuid().optional().catch(undefined),
})

export type ParkFilters = z.infer<typeof parkFiltersSchema>

// The selected park lives in the address too (E6), and gets the same treatment:
// an id that no longer exists opens a screen with nothing selected, not an
// error screen.
//
// It is deliberately NOT part of the filter schema. The filters are what the
// parks query is keyed on, and folding the selection in would give every marker
// click a new cache key - which means a refetch, and a list that blinks every
// time a park is picked on the map.
export const parkSearchSchema = parkFiltersSchema.extend({
  selected: z.uuid().optional().catch(undefined),
})

export type ParkSearch = z.infer<typeof parkSearchSchema>

// The filter subset, and only it, is what reaches the query.
export function toFilters({ search, regionId, cityId }: ParkSearch): ParkFilters {
  return { search, regionId, cityId }
}
