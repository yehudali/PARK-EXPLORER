import { z } from 'zod';

export const citiesByRegionInput = z.object({
  regionId: z.uuid(),
});

export type CitiesByRegionInput = z.infer<typeof citiesByRegionInput>;

export const citySchema = z.object({
  id: z.uuid(),
  name: z.string(),
});
