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
