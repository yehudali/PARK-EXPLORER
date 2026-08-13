import { pgTable, uuid, text, unique } from 'drizzle-orm/pg-core';
import { regions } from './regions.schema';

export const cities = pgTable(
  'cities',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    regionId: uuid('region_id')
      .notNull()
      // מחיקת אזור עם ערים תיכשל, לא תמחק בשקט
      .references(() => regions.id, { onDelete: 'restrict' }),
  },
  // שם עיר ייחודי בתוך אזור, לא ברמת המדינה
  (table) => [unique().on(table.name, table.regionId)],
);
