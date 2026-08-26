import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { LoginScreen } from '@/features/auth/components/login-screen'

// Where the guard sends people it turned away, so we can send them back.
const searchSchema = z.object({ redirect: z.string().optional() })

export const Route = createFileRoute('/login')({
  validateSearch: (search) => searchSchema.parse(search),
  component: LoginScreen,
})
