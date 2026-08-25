import { Router, Query, Input } from 'nestjs-trpc';
import { z } from 'zod';
import { parkSchema, parkByIdInput, type ParkByIdInput } from './parks.schemas';
import { ParksService } from './parks.service';

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
}
