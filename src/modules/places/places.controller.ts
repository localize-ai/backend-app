import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('places')
@ApiTags('places')
export class PlacesController {

  constructor(
    private readonly placesService: PlacesService
  ) { }

  @Get('explores')
  @CacheKey('explores-places')
  @CacheTTL(1000 * 60 * 60 * 24)
  @UseInterceptors(CacheInterceptor)
  async getExplores() {
    return this.placesService.getExplores();
  }
}
