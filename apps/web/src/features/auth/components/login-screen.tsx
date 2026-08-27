import { getRouteApi, useNavigate, useRouter } from '@tanstack/react-router'
import { AuthCard } from './auth-card'
import { LoginForm } from './login-form'

// getRouteApi lets a component outside the route file read that route's search
// params with the same typing - which is what keeps the route file itself thin.
const route = getRouteApi('/login')

export function LoginScreen() {
  const { redirect } = route.useSearch()
  const router = useRouter()
  const navigate = useNavigate()

  return (
    <AuthCard title="Sign in" description="Sign in to browse and add parks.">
      <LoginForm
        onSuccess={() => {
          // history.push, not navigate - the blocked address is a plain string
          // and the typed router will not take one as a route.
          if (redirect) router.history.push(redirect)
          else navigate({ to: '/' })
        }}
      />
    </AuthCard>
  )
}
