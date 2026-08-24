import { relations } from 'drizzle-orm';
import { parks } from './parks.schema';
import { users } from './users.schema';
import { parkImages } from './park-images.schema';
import { regions } from './regions.schema';
import { cities } from './cities.schema';

export const parksRelations = relations(parks, ({ one, many }) => ({
  city: one(cities, {
    fields: [parks.cityId],
    references: [cities.id],
  }),
  creator: one(users, {
    fields: [parks.creatorId],
    references: [users.id],
  }),
  images: many(parkImages),
}));

export const citiesRelations = relations(cities, ({ one, many }) => ({
  parks: many(parks),
  region: one(regions, {
    fields: [cities.regionId],
    references: [regions.id],
  }),
}));

export const regionsRelations = relations(regions, ({ many }) => ({
  cities: many(cities),
}));

export const usersRelations = relations(users, ({ many }) => ({
  parks: many(parks),
}));

export const parkImagesRelations = relations(parkImages, ({ one }) => ({
  park: one(parks, {
    fields: [parkImages.parkId],
    references: [parks.id],
  }),
}));
