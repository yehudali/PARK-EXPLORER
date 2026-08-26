import { z } from 'zod';

const pointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.array(z.number()),
});

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(z.array(z.array(z.number()))),
});

export const parkSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  creatorId: z.uuid(),
  cityId: z.uuid(),
  cityName: z.string(),
  openingDate: z.string().nullable(),
  location: pointSchema,
  polygon: polygonSchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Every field is optional: no filter at all is a valid request, and it is the
// one the main screen makes on a cold load.
export const findAllParksInput = z.object({
  search: z.string().optional(),
  regionId: z.uuid().optional(),
  cityId: z.uuid().optional(),
});

export type FindAllParksInput = z.infer<typeof findAllParksInput>;

export const parkByIdInput = z.object({
  id: z.uuid(),
});

export type ParkByIdInput = z.infer<typeof parkByIdInput>;

export const createParkInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  cityId: z.uuid(),
  openingDate: z.iso.date().optional(),
  location: pointSchema,
  polygon: polygonSchema.optional(),
});

export type CreateParkInput = z.infer<typeof createParkInput>;

// Every field is optional, which makes { id } alone a valid input. An update
// with nothing to set is a runtime error in Drizzle, so it is blocked here.
export const updateParkInput = createParkInput
  .partial()
  .extend({ id: z.uuid() })
  .refine((input) => Object.keys(input).length > 1, {
    message: 'Provide at least one field to update',
  });

export type UpdateParkInput = z.infer<typeof updateParkInput>;

// Deletion cannot return a park, because there is no longer one to return.
export const deletedParkOutput = z.object({
  id: z.uuid(),
});
