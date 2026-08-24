import { createDatabase } from '@park-explorer/db';
import { config } from '../config/config';

export const CONNECT_TO_DB = 'DATABASE_CONNECTION';

export const ConnToDbProvider = {
  provide: CONNECT_TO_DB,
  useFactory: () => createDatabase(config.database.url),
};
