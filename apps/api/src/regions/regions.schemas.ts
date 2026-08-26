import { z } from 'zod';

export const regionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});
