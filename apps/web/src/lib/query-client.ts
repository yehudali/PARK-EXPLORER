import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { errorCodeOf, isUnauthorized } from './errors'
import { useAuthStore } from '@/stores/auth.store'

// A wrong password or a park that does not exist is an answer, not a fault.
// Retrying it three times only delays the message the user needs to see.
const USER_ERROR_CODES = new Set([
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
])

function isUserError(error: unknown) {
  return USER_ERROR_CODES.has(errorCodeOf(error))
}

export function createQueryClient() {
  // One place decides that the session is over. Any request, anywhere, that
  // comes back unauthorised signs the user out - so a token that expired mid
  // session cannot leave a half-broken screen behind.
  function handleUnauthorized(error: unknown) {
    if (!isUnauthorized(error)) return
    // No token means this is a failed sign-in attempt, not an expired session.
    if (useAuthStore.getState().token === null) return

    useAuthStore.getState().clear()
    // Out of the error callback before touching the cache it is iterating.
    setTimeout(() => client.clear(), 0)
  }

  const client = new QueryClient({
    queryCache: new QueryCache({ onError: handleUnauthorized }),
    mutationCache: new MutationCache({ onError: handleUnauthorized }),
    defaultOptions: {
      queries: {
        // A minute of freshness stops the same list being pulled again on every
        // remount, without letting the screen go stale during a demo.
        staleTime: 60_000,
        // Off on purpose: switching tabs during a demo should not reload
        // everything on screen.
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => !isUserError(error) && failureCount < 2,
      },
      mutations: {
        // Never send a write twice.
        retry: false,
      },
    },
  })

  return client
}
