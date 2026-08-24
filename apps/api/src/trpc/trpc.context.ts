import { Injectable } from '@nestjs/common';
import { TRPCContext } from 'nestjs-trpc';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

@Injectable()
export class TRPCContextService implements TRPCContext {
  create(opts: CreateExpressContextOptions) {
    const authHeader = opts.req.headers.authorization;
    return {
      authHeader,
    };
  }
}
