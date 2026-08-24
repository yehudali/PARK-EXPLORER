import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// The database instance every consumer talks to. Services depend on this type
// instead of reaching into drizzle's own types.
export type Database = NodePgDatabase<typeof schema>;

// The connection string is a parameter on purpose: this package never reads the
// environment. Whoever starts the process is the one that reads it.
export function createDatabase(connectionString: string): Database {
  const pool = new Pool({ connectionString });

  return drizzle({ client: pool, schema });
}
