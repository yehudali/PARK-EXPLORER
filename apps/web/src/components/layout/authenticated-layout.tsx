import { Navigate, Outlet } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/common/full-screen-loader'
import { AppShell } from './app-shell'
import { useSession } from '@/features/auth/hooks/useAuth'

// What sits behind the guard: verify the stored token against the server once,
// and only then draw anything.
export function AuthenticatedLayout() {
  const session = useSession()

  // A token that turned out to be dead. The global handler has already dropped
  // it; this sends the user on.
  if (session.isError) {
    return <Navigate to="/login" />
  }

  if (session.isPending) {
    return <FullScreenLoader />
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
