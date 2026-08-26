import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type TokenPayload = {
  sub: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(userId: string): string {
    const payload: TokenPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify<TokenPayload>(token);
  }
}
