import { Injectable } from '@nestjs/common';
import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { TRPCError } from '@trpc/server';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(opts: MiddlewareOptions) {
    const { ctx, next } = opts;
    // const authHeader = ctx.authHeader;
    // nestjs-trpc doesn't type the ctx shape here — this matches what TRPCContextService returns
    const authHeader = (ctx as { authHeader?: string }).authHeader;

    if (!authHeader) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.tokenService.verify(token);
      return next({ ctx: { userId: payload.sub } });
    } catch {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  }
}
