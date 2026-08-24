import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { HealthRouter } from './router/health/health.router';
import { DatabaseModule } from './database/database.module';
import { RegionsModule } from './regions/regions.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { TRPCContextService } from './trpc/trpc.context';

@Module({
  imports: [
    TRPCModule.forRoot({ context: TRPCContextService }),
    DatabaseModule,
    RegionsModule,
    CitiesModule,
    AuthModule,
  ],
  providers: [HealthRouter, TRPCContextService],
})
export class AppModule {}
