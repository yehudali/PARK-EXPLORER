import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router';
import { AuthMiddleware } from './auth.middleware';
import { config } from '../config/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  providers: [
    PasswordService,
    TokenService,
    AuthService,
    AuthRouter,
    AuthMiddleware,
  ],
})
export class AuthModule {}
