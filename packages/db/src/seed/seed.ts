import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';

import { createDatabase } from '../index';
import { regions as regionsTable, cities as citiesTable } from '../schema';

import { regions } from './data/regions';
import { cities } from './data/cities';

// Same as drizzle.config.ts: a standalone program reads the root .env itself.
loadEnv({ path: resolve(process.cwd(), '../../.env') });

async function seed() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('Missing environment variable: DATABASE_URL');
  }

  const db = createDatabase(connectionString);

  await db
    .insert(regionsTable)
    .values(regions.map((name) => ({ name })))
    // On a repeated run, do nothing:
    .onConflictDoNothing();

  const existingRegions = await db.select().from(regionsTable);
  const regionIdByName = new Map(existingRegions.map((r) => [r.name, r.id]));

  await db
    .insert(citiesTable)
    .values(
      cities.map((city) => ({
        name: city.name,
        regionId: regionIdByName.get(city.regionName)!,
      })),
    )
    .onConflictDoNothing();

  console.log('Seed complete');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
