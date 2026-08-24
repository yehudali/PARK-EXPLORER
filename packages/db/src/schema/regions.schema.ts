import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const regions = pgTable('regions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});
