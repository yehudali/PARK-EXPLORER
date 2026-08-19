import { Router, Query } from 'nestjs-trpc';
import { z } from 'zod';
import { regionSchema } from './region.output';
import { RegionsService } from './regions.service';

@Router()
export class RegionsRouter {
  constructor(private readonly regionsService: RegionsService) {}
  @Query({ output: z.array(regionSchema) })
  findAll() {
    return this.regionsService.findAll();
  }
}
