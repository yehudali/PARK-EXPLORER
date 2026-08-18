import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RegionsService } from './regions.service';

@Module({
  imports: [DatabaseModule],
  providers: [RegionsService],
})
export class RegionsModule {}
