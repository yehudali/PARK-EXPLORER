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
    const [created] = await this.db
      .insert(parks)
      .values({ ...input, creatorId })
      .returning({ id: parks.id });

    return this.findById(created.id);
  }

  // The ownership rule lives here, not in the router: it stays true even with
  // no HTTP involved. Missing and forbidden are deliberately different codes.
  async update(input: UpdateParkInput, userId: string) {
    const { id, ...changes } = input;

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

    // defaultNow only fires on insert, so the update timestamp is set by hand.
    await this.db
      .update(parks)
      .set({ ...changes, updatedAt: new Date() })
      .where(eq(parks.id, id));

    return this.findById(id);
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
