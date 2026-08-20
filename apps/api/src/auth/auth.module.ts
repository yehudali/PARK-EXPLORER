import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router';
import { TRPCContextService } from './trpc.context';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `15m` },
    }),
  ],
  providers: [PasswordService, AuthService, AuthRouter, TRPCContextService],
})
export class AuthModule {}
