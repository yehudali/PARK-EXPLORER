import { Module } from '@nestjs/common';
import { ConnToDbProvider } from './database.providers';

@Module({
  providers: [ConnToDbProvider],
  exports: [ConnToDbProvider],
})
export class DatabaseModule {}
