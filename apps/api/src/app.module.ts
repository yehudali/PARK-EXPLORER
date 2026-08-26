import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { HealthRouter } from './router/health/health.router';
import { DatabaseModule } from './database/database.module';
import { RegionsModule } from './regions/regions.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { TRPCContextService } from './trpc/trpc.context';
import { DomainErrorsMiddleware } from './common/domain-errors.middleware';
import { ParksModule } from './parks/parks.module';

@Module({
  imports: [
    TRPCModule.forRoot({
      context: TRPCContextService,
      globalMiddlewares: [DomainErrorsMiddleware],
    }),
    DatabaseModule,
    RegionsModule,
    CitiesModule,
    AuthModule,
    ParksModule,
  ],
  providers: [HealthRouter, TRPCContextService, DomainErrorsMiddleware],
})
export class AppModule {}
