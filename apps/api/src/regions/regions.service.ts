import { Inject, Injectable } from '@nestjs/common';
import type { Database } from '@park-explorer/db';
import { regions } from '@park-explorer/db/schema';
import { CONNECT_TO_DB } from '../database/database.providers';

@Injectable()
export class RegionsService {
  constructor(@Inject(CONNECT_TO_DB) private readonly db: Database) {}

  async findAll() {
    return this.db.select().from(regions);
  }
}
