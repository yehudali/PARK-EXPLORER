import 'dotenv/config';
import { ConnToDbProvider } from '../database.providers';
import { regions as regionsTable, cities as citiesTable } from '../schema';

import { regions } from './data/regions';
import { cities } from './data/cities';

async function seed() {
  const db = ConnToDbProvider.useFactory();

  await db
    .insert(regionsTable)
    .values(regions.map((name) => ({ name })))
    // במצב של טעינה חוזרת, אלך תעשה כלום...:
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
