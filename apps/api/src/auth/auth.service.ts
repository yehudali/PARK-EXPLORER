import { Inject, Injectable } from '@nestjs/common';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../common/domain.errors';
import { eq } from 'drizzle-orm';
import type { Database } from '@park-explorer/db';
import { users } from '@park-explorer/db/schema';
import { CONNECT_TO_DB } from '../database/database.providers';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';
import type { RegisterInput, LoginInput } from './auth.schemas';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CONNECT_TO_DB)
    private readonly db: Database,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(input: RegisterInput) {
    const unique = await this.isUniqueEmail(input.email);
    if (!unique) {
      throw new ConflictError();
    }

    const passwordHash = await this.passwordService.hashPassword(
      input.password,
    );
    const [user] = await this.db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        passwordHash,
      })
      .returning();

    return this.issueToken(user.id);
  }

  async login(input: LoginInput) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (!user) {
      throw new UnauthorizedError();
    }

    const isValid = await this.passwordService.verifyPassword(
      input.password,
      user.passwordHash,
    );

    if (!isValid) {
      throw new UnauthorizedError();
    }

    return this.issueToken(user.id);
  }

  async getCurrentUser(userId: string) {
    const [user] = await this.db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  private async isUniqueEmail(email: string) {
    const rows = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return rows.length === 0;
  }

  private issueToken(userId: string) {
    const token = this.tokenService.sign(userId);
    return { token };
  }
}
