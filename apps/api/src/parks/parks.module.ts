import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ParksService } from './parks.service';
import { ParksRouter } from './parks.router';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [ParksService, ParksRouter],
})
export class ParksModule {}
