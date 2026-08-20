import { z } from 'zod';

export const authOutput = z.object({
  token: z.string(),
});
