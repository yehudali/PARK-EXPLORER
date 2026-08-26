import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

import { users } from './users.schema';
import { cities } from './cities.schema';
import type { Point, Polygon } from 'geojson';

export const parks = pgTable('parks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  cityId: uuid('city_id')
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict' }),

  openingDate: date('opening_date'),
  location: jsonb('location').$type<Point>().notNull(),
  polygon: jsonb('polygon').$type<Polygon>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
