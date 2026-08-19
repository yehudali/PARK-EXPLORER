import { z } from 'zod';

export const citySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
