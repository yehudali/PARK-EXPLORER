import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CitiesService } from './cities.service';
import { CitiesRouter } from './cities.router';

@Module({
  imports: [DatabaseModule],
  providers: [CitiesService, CitiesRouter],
})
export class CitiesModule {}
