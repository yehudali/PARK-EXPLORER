import { TRPCClientError } from '@trpc/client'

// The server throws domain errors with no message at all - the middleware turns
// them into a bare code. So every word the user reads is decided here, and
// nowhere else.
export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR'
  | 'OFFLINE'
  | 'UNKNOWN'

export type ErrorOverrides = Partial<Record<ErrorCode, string>>

const DEFAULT_MESSAGES: Record<ErrorCode, string> = {
  BAD_REQUEST: 'Some of the details are not valid. Check the form and try again.',
  UNAUTHORIZED: 'Your session has ended. Sign in again.',
  FORBIDDEN: 'You can only change parks you added yourself.',
  NOT_FOUND: 'That item no longer exists.',
  CONFLICT: 'That already exists.',
  INTERNAL_SERVER_ERROR: 'Something went wrong on the server. Try again.',
  OFFLINE: 'Could not reach the server. Check that it is running.',
  UNKNOWN: 'Something went wrong. Try again.',
}

export function errorCodeOf(error: unknown): ErrorCode {
  if (!(error instanceof TRPCClientError)) return 'UNKNOWN'

  const code: unknown = error.data?.code
  if (typeof code === 'string' && code in DEFAULT_MESSAGES) {
    return code as ErrorCode
  }

  // A tRPC error that carries no code never reached the server.
  return error.data === undefined ? 'OFFLINE' : 'UNKNOWN'
}

// Screens pass overrides for the codes that mean something specific to them:
// on the register screen a conflict is a taken email, and nothing else.
export function messageFor(error: unknown, overrides?: ErrorOverrides): string {
  const code = errorCodeOf(error)
  return overrides?.[code] ?? DEFAULT_MESSAGES[code]
}

export function isUnauthorized(error: unknown): boolean {
  return errorCodeOf(error) === 'UNAUTHORIZED'
}
