import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CONNECT_TO_DB } from '../database/database.providers';
import { regions } from '../database/schema';

import * as schema from '../database/schema';

@Injectable()
export class RegionsService {
  constructor(
    @Inject(CONNECT_TO_DB) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(regions);
  }
}
