import { z } from 'zod';

import {
  authOutput,
  meOutput,
  loginInput,
  registerInput,
} from './auth.schemas';
import { AuthService } from './auth.service';
import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from 'nestjs-trpc';
import { AuthMiddleware } from './auth.middleware';

@Router()
export class AuthRouter {
  constructor(private readonly authService: AuthService) {}

  @Mutation({ input: registerInput, output: authOutput })
  register(@Input() input: z.infer<typeof registerInput>) {
    return this.authService.register(input);
  }

  @Mutation({ input: loginInput, output: authOutput })
  login(@Input() input: z.infer<typeof loginInput>) {
    return this.authService.login(input);
  }

  @UseMiddlewares(AuthMiddleware)
  @Query({ output: meOutput })
  me(@Ctx() ctx: unknown) {
    // ctx is typed unknown by nestjs-trpc; userId is added by AuthMiddleware
    const { userId } = ctx as { userId: string };
    return this.authService.getCurrentUser(userId);
  }
}
