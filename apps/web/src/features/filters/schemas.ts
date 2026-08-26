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
