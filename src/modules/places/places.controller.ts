import { Controller, Get } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('places')
@ApiTags('places')
export class PlacesController {

  constructor(
    private readonly placesService: PlacesService
  ) { }

  @Get('explores')
  async getExplores() {
    return this.placesService.getExplores();
  }
}
