import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { CONNECT_TO_DB } from '../database/database.providers';
import { cities } from '../database/schema';

import * as schema from '../database/schema';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CONNECT_TO_DB) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findByRegion(regionId: string) {
    return this.db.select().from(cities).where(eq(cities.regionId, regionId));
  }
}
