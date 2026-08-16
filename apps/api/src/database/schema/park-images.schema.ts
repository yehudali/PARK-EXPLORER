import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { parks } from './parks.schema';

export const parkImages = pgTable('park_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  parkId: uuid('park_id')
    .notNull()
    .references(() => parks.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
