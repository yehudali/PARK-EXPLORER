import { z } from 'zod';

export const regionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});
