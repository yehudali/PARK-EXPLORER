import { Input, Mutation, Router } from 'nestjs-trpc';
import { z } from 'zod';

import { authOutput } from './auth.output';
import { AuthService } from './auth.service';
import { loginInput } from './login.input';
import { registerInput } from './register.input';

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
}
