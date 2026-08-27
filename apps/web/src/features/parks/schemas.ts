import { z } from 'zod'

// Every field is a string, because that is what an input element holds. The
// conversion to numbers and to the server's Point shape happens on submit, in
// one place, rather than being spread through the form.
function coordinate(min: number, max: number, label: string) {
  return z.string().refine(
    (raw) => {
      const value = Number(raw)
      return raw.trim() !== '' && !Number.isNaN(value) && value >= min && value <= max
    },
    { message: `${label} must be a number between ${min} and ${max}.` },
  )
}

// Mirrors apps/api/src/parks/parks.schemas.ts (D16), plus one field the server
// never sees: the region only exists to narrow the city list.
export const parkFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().optional(),
  // Not required and never sent: the region only narrows the city list. When
  // editing, the city is already known and no region needs choosing at all.
  regionId: z.string().optional(),
  cityId: z.uuid('Choose a city.'),
  openingDate: z.string().optional(),
  latitude: coordinate(-90, 90, 'Latitude'),
  longitude: coordinate(-180, 180, 'Longitude'),
})

export type ParkFormValues = z.infer<typeof parkFormSchema>
