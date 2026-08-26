import { Router, Query } from 'nestjs-trpc';
import { z } from 'zod';

const healthOutput = z.object({
  status: z.string(),
  message: z.string(),
});

@Router()
export class HealthRouter {
  @Query({ output: healthOutput })
  health() {
    return { status: 'ok', message: 'Hello!!' };
  }
}
