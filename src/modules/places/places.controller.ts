import { Body, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';
import { PlaceReviewsService } from './place-reviews.service';
import { CreatePlaceReviewsDto } from './dto/create.place-reviews.dto';

@Controller('places')
@ApiTags('places')
export class PlacesController {

  constructor(
    private readonly placesService: PlacesService,
    private readonly placeReviewsService: PlaceReviewsService,
  ) { }

  @Get('explores')
  @CacheKey('explores-places')
  @CacheTTL(1000 * 60 * 60 * 24)
  @UseInterceptors(CacheInterceptor)
  async getExplores() {
    return this.placesService.getExplores();
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: CreatePlaceReviewsDto
  ) {
    return this.placeReviewsService.create(
      req.user.id,
      id,
      dto,
    );
  }

  @Get(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getReviews(@Param('id') id: string) {
    return this.placeReviewsService.getReviews(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPlace(@Param('id') id: string) {
    return this.placesService.getPlace(id);
  }
}
