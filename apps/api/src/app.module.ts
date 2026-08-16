import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { HealthRouter } from './health/health.router';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TRPCModule.forRoot({}), DatabaseModule],
  providers: [HealthRouter],
})
export class AppModule {}
