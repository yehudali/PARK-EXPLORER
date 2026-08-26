import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RegionsService } from './regions.service';
import { RegionsRouter } from './regions.router';

@Module({
  imports: [DatabaseModule],
  providers: [RegionsService, RegionsRouter],
})
export class RegionsModule {}
