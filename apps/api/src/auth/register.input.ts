import { z } from 'zod';

export const registerInput = z.object({
  name: z.string().min(3),
  password: z.string().min(6),
  email: z.email(),
});
