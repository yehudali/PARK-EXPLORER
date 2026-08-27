import { Navigate, Outlet } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/common/full-screen-loader'
import { QueryState } from '@/components/common/query-state'
import { isUnauthorized } from '@/lib/errors'
import { AppShell } from './app-shell'
import { useSession } from '@/features/auth/hooks/useAuth'

// What sits behind the guard: verify the stored token against the server once,
// and only then draw anything.
export function AuthenticatedLayout() {
  const session = useSession()

  // Only a real authorisation failure ends the session. A server that is down
  // must not look like a token problem - that would bounce the user to a sign
  // in screen that cannot work either.
  if (session.isError && isUnauthorized(session.error)) {
    return <Navigate to="/login" />
  }

  return (
    // grid, so the error panel stretches to the full height it centres in.
    <div className="grid min-h-svh">
      <QueryState
        query={session}
        skeleton={<FullScreenLoader />}
        empty={null}
        errorTitle="Could not reach the server"
        errorOverrides={{
          OFFLINE: 'Check that it is running, then try again.',
        }}
      >
        {() => (
          <AppShell>
            <Outlet />
          </AppShell>
        )}
      </QueryState>
    </div>
  )
}
