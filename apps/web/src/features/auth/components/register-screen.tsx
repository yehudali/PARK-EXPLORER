import { useNavigate } from '@tanstack/react-router'
import { AuthCard } from './auth-card'
import { RegisterForm } from './register-form'

export function RegisterScreen() {
  const navigate = useNavigate()

  return (
    <AuthCard
      title="Create an account"
      description="You will be signed in right away."
    >
      {/* Registering returns a token, so there is nothing else to do. */}
      <RegisterForm onSuccess={() => navigate({ to: '/' })} />
    </AuthCard>
  )
}
