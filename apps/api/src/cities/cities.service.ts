import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { Database } from '@park-explorer/db';
import { cities } from '@park-explorer/db/schema';
import { CONNECT_TO_DB } from '../database/database.providers';

@Injectable()
export class CitiesService {
  constructor(@Inject(CONNECT_TO_DB) private readonly db: Database) {}

  async findByRegion(regionId: string) {
    return this.db.select().from(cities).where(eq(cities.regionId, regionId));
  }
}
