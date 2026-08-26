import { Injectable } from '@nestjs/common';
import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { TRPCError } from '@trpc/server';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import {
  ConflictError,
  DomainError,
  ForbiddenError,
  InvalidInputError,
  NotFoundError,
  UnauthorizedError,
} from './domain.errors';

// The single place that knows both languages. Services throw domain errors;
// this turns them into the transport's vocabulary on the way out.
function codeFor(error: DomainError): TRPC_ERROR_CODE_KEY {
  if (error instanceof NotFoundError) return 'NOT_FOUND';
  if (error instanceof ForbiddenError) return 'FORBIDDEN';
  if (error instanceof ConflictError) return 'CONFLICT';
  if (error instanceof UnauthorizedError) return 'UNAUTHORIZED';
  if (error instanceof InvalidInputError) return 'BAD_REQUEST';
  return 'INTERNAL_SERVER_ERROR';
}

@Injectable()
export class DomainErrorsMiddleware implements TRPCMiddleware {
  async use(opts: MiddlewareOptions) {
    const { next } = opts;
    const result = await next();

    if (result.ok) {
      return result;
    }

    // next() does not throw. A failure downstream comes back as a result, with
    // whatever was thrown tucked into the error's cause.
    const cause = (result.error as { cause?: unknown })?.cause;

    if (cause instanceof DomainError) {
      throw new TRPCError({
        code: codeFor(cause),
        message: cause.message || undefined,
      });
    }

    return result;
  }
}
