import { z } from 'zod'

// Mirrors apps/api/src/auth/auth.schemas.ts on purpose (D16). The server stays
// the authority - this copy exists so the form can say what is wrong before a
// request is sent. When the two drift, the server wins and the form is wrong.
export const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(3, 'Password must be at least 3 characters.'),
})

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  email: z.email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
