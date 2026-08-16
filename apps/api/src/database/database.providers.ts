import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const CONNECT_TO_DB = 'DATABASE_CONNECTION';

export const ConnToDbProvider = {
  provide: CONNECT_TO_DB,
  useFactory: () => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return drizzle({ client: pool, schema });
  },
};
