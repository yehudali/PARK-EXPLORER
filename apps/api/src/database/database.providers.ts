import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { config } from '../config/config';

export const CONNECT_TO_DB = 'DATABASE_CONNECTION';

export const ConnToDbProvider = {
  provide: CONNECT_TO_DB,
  useFactory: () => {
    const pool = new Pool({ connectionString: config.database.url });
    return drizzle({ client: pool, schema });
  },
};
