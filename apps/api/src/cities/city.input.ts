import { z } from 'zod';

export const citiesByRegionInput = z.object({
  regionId: z.uuid(),
});
