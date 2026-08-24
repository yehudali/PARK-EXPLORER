import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_URL_UNPOOLED: z.string().min(1),
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
    migrationUrl: env.DATABASE_URL_UNPOOLED,
  },
  server: {
    port: env.PORT,
  },
} as const;
