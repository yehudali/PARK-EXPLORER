import { z } from 'zod';

export const loginInput = z.object({
  email: z.email(),
  password: z.string().min(3),
});
