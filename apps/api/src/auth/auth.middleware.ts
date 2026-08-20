import { Injectable } from '@nestjs/common';
import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { JwtService } from '@nestjs/jwt';
import { TRPCError } from '@trpc/server';

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  constructor(private readonly jwtService: JwtService) {}

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
      // const payload = this.jwtService.verify(token);
      // shape must match the payload signed in auth.service.ts
      const payload = this.jwtService.verify<{ sub: string }>(token);
      return next({ ctx: { userId: payload.sub } });
    } catch {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  }
}
