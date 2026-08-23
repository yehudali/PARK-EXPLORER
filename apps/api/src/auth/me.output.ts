import { z } from 'zod';

export const meOutput = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
});
