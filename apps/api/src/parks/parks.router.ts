import {
  Router,
  Query,
  Mutation,
  Input,
  Ctx,
  UseMiddlewares,
} from 'nestjs-trpc';
import { z } from 'zod';
import {
  parkSchema,
  parkByIdInput,
  createParkInput,
  updateParkInput,
  type ParkByIdInput,
  type CreateParkInput,
  type UpdateParkInput,
} from './parks.schemas';
import { ParksService } from './parks.service';
import { AuthMiddleware } from '../auth/auth.middleware';

@Router()
export class ParksRouter {
  constructor(private readonly parksService: ParksService) {}

  @Query({ output: z.array(parkSchema) })
  findAll() {
    return this.parksService.findAll();
  }

  @Query({ input: parkByIdInput, output: parkSchema })
  findById(@Input() input: ParkByIdInput) {
    return this.parksService.findById(input.id);
  }

  @UseMiddlewares(AuthMiddleware)
  @Mutation({ input: createParkInput, output: parkSchema })
  create(@Input() input: CreateParkInput, @Ctx() ctx: unknown) {
    // ctx is typed unknown by nestjs-trpc; userId is added by AuthMiddleware
    const { userId } = ctx as { userId: string };
    return this.parksService.create(input, userId);
  }

  @UseMiddlewares(AuthMiddleware)
  @Mutation({ input: updateParkInput, output: parkSchema })
  update(@Input() input: UpdateParkInput, @Ctx() ctx: unknown) {
    const { userId } = ctx as { userId: string };
    return this.parksService.update(input, userId);
  }
}
