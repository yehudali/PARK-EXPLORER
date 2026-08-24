import { z } from 'zod';

export const registerInput = z.object({
  name: z.string().min(3),
  password: z.string().min(6),
  email: z.email(),
});

export const loginInput = z.object({
  email: z.email(),
  password: z.string().min(3),
});

export const authOutput = z.object({
  token: z.string(),
});

export const meOutput = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
});
