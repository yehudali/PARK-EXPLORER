import { Inject, Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import { eq, getTableColumns } from 'drizzle-orm';
import type { Database } from '@park-explorer/db';
import { parks, cities } from '@park-explorer/db/schema';
import { CONNECT_TO_DB } from '../database/database.providers';

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
