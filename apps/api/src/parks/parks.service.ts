import { Inject, Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import { eq, getTableColumns } from 'drizzle-orm';
import type { Database } from '@park-explorer/db';
import { parks, cities } from '@park-explorer/db/schema';
import { CONNECT_TO_DB } from '../database/database.providers';
import type { CreateParkInput, UpdateParkInput } from './parks.schemas';

// Every park query returns the same shape: the whole park row, plus the city
// name, which lives on another table.
const parkColumns = {
  ...getTableColumns(parks),
  cityName: cities.name,
};

@Injectable()
export class ParksService {
  constructor(@Inject(CONNECT_TO_DB) private readonly db: Database) {}

  async findAll() {
    const rows = await this.db
      .select(parkColumns)
      .from(parks)
      .innerJoin(cities, eq(parks.cityId, cities.id));

    return rows.map((row) => this.toPark(row));
  }

  async findById(id: string) {
    const [park] = await this.db
      .select(parkColumns)
      .from(parks)
      .innerJoin(cities, eq(parks.cityId, cities.id))
      .where(eq(parks.id, id))
      .limit(1);

    if (!park) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    return this.toPark(park);
  }

  // The creator is a separate argument on purpose: it comes from the verified
  // token, not from the request body, so it must not be spreadable over.
  async create(input: CreateParkInput, creatorId: string) {
    await this.assertCityExists(input.cityId);

    const [created] = await this.db
      .insert(parks)
      .values({ ...input, creatorId })
      .returning({ id: parks.id });

    return this.findById(created.id);
  }

  async update(input: UpdateParkInput, userId: string) {
    const { id, ...changes } = input;

    await this.assertOwner(id, userId);

    if (changes.cityId) {
      await this.assertCityExists(changes.cityId);
    }

    // updatedAt refreshes itself: the column declares $onUpdate in the schema.
    await this.db.update(parks).set(changes).where(eq(parks.id, id));

    return this.findById(id);
  }

  async remove(id: string, userId: string) {
    await this.assertOwner(id, userId);

    // Rows in park_images go with it: their foreign key declares onDelete
    // cascade, so the database removes them without being asked.
    await this.db.delete(parks).where(eq(parks.id, id));

    // The park no longer exists, so returning it would be a lie. The id is
    // enough for the client to drop it from whatever it is showing.
    return { id };
  }

  // The foreign key would reject this anyway, but only as a database error the
  // client cannot act on. Asking first turns it into an answerable one.
  private async assertCityExists(cityId: string) {
    const [city] = await this.db
      .select({ id: cities.id })
      .from(cities)
      .where(eq(cities.id, cityId))
      .limit(1);

    if (!city) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'cityId does not match an existing city',
      });
    }
  }

  // The ownership rule lives here, not in the router: it stays true even with
  // no HTTP involved. Missing and forbidden are deliberately different codes.
  private async assertOwner(id: string, userId: string) {
    const [existing] = await this.db
      .select({ creatorId: parks.creatorId })
      .from(parks)
      .where(eq(parks.id, id))
      .limit(1);

    if (!existing) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    if (existing.creatorId !== userId) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
  }

  // Drizzle returns timestamp columns as Date objects, while the output schema
  // promises strings. Converting here is what keeps that promise true.
  private toPark<T extends { createdAt: Date; updatedAt: Date }>(row: T) {
    return {
      ...row,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}
