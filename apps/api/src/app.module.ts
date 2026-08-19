import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { HealthRouter } from './router/health/health.router';
import { DatabaseModule } from './database/database.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [TRPCModule.forRoot({}), DatabaseModule, RegionsModule],
  providers: [HealthRouter],
})
export class AppModule {}
