import { z } from 'zod';

export const citySchema = z.object({
  id: z.uuid(),
  name: z.string(),
});
