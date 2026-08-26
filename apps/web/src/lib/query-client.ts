import { QueryClient } from '@tanstack/react-query'
import { TRPCClientError } from '@trpc/client'

// A wrong password or a park that does not exist is an answer, not a fault.
// Retrying it three times only delays the message the user needs to see.
const USER_ERROR_CODES = new Set([
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'PARSE_ERROR',
])

function isUserError(error: unknown) {
  if (!(error instanceof TRPCClientError)) return false
  const code: unknown = error.data?.code
  return typeof code === 'string' && USER_ERROR_CODES.has(code)
}

export function createQueryClient() {
  return new QueryClient({
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
}
