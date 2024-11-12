import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPlace(@Param('id') id: string) {
    return this.placesService.getPlace(id);
  }
}
