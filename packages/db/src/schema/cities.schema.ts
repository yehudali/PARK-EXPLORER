import { pgTable, uuid, text, unique } from 'drizzle-orm/pg-core';
import { regions } from './regions.schema';

export const cities = pgTable(
  'cities',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    regionId: uuid('region_id')
      .notNull()
      // Deleting a region that still has cities fails, instead of deleting silently
      .references(() => regions.id, { onDelete: 'restrict' }),
  },
  // City name is unique within a region, not country-wide
  (table) => [unique().on(table.name, table.regionId)],
);
