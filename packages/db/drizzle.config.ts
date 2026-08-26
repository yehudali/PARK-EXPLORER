import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// drizzle-kit runs as a standalone program, so it loads the monorepo-root .env
// itself. The path is resolved from the working directory, which is this package
// both under `npm run` at the root (turbo) and when run from here directly.
loadEnv({ path: resolve(process.cwd(), '../../.env') });

const url = process.env.DATABASE_URL_UNPOOLED;

if (!url) {
  throw new Error('Missing environment variable: DATABASE_URL_UNPOOLED');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url,
  },
});
