import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

// One .env for the whole monorepo, at its root. The path is resolved from the
// working directory, which is this app whether it is started from the root
// (turbo) or from here.
loadEnv({ path: resolve(process.cwd(), '../../.env') });

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  PORT: z.coerce.number().default(3000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((issue) => issue.path.join('.'))
    .join(', ');

  throw new Error(`Invalid environment variables: ${missing}`);
}

const env = parsed.data;

export const config = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '15m',
  },
  database: {
    url: env.DATABASE_URL,
  },
  server: {
    port: env.PORT,
  },
} as const;
