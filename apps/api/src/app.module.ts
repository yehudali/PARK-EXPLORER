import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { HealthRouter } from './trpc/app.router';

@Module({
  imports: [TRPCModule.forRoot({})],
  providers: [HealthRouter],
})
export class AppModule {}
