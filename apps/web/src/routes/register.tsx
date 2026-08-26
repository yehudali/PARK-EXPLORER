import { createFileRoute } from '@tanstack/react-router'
import { RegisterScreen } from '@/features/auth/components/register-screen'

export const Route = createFileRoute('/register')({
  component: RegisterScreen,
})
