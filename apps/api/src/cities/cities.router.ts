import { Router, Query, Input } from 'nestjs-trpc';
import { z } from 'zod';
import {
  citySchema,
  citiesByRegionInput,
  type CitiesByRegionInput,
} from './cities.schemas';
import { CitiesService } from './cities.service';

@Router()
export class CitiesRouter {
  constructor(private readonly citiesService: CitiesService) {}

  @Query({ input: citiesByRegionInput, output: z.array(citySchema) })
  findByRegion(@Input() input: CitiesByRegionInput) {
    return this.citiesService.findByRegion(input.regionId);
  }
}
