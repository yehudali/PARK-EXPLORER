import { Router, Query, Input } from 'nestjs-trpc';
import { z } from 'zod';
import { citySchema } from './city.output';
import { citiesByRegionInput } from './city.input';
import { CitiesService } from './cities.service';

@Router()
export class CitiesRouter {
  constructor(private readonly citiesService: CitiesService) {}

  @Query({ input: citiesByRegionInput, output: z.array(citySchema) })
  findByRegion(@Input() input: z.infer<typeof citiesByRegionInput>) {
    return this.citiesService.findByRegion(input.regionId);
  }
}
