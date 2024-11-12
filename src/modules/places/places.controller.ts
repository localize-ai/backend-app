import { Body, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { PlacesService } from './services/places.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';
import { PlaceReviewsService } from './services/place-reviews.service';
import { CreatePlaceReviewsDto } from './dto/create.place-reviews.dto';
import { CreatePlaceRequestsDto } from './dto/create.place-requests.dto';
import { PlaceRequestsService } from './services/place-requests.service';

@Controller('places')
export class PlacesController {

  constructor(
    private readonly placesService: PlacesService,
    private readonly placeReviewsService: PlaceReviewsService,
    private readonly placeRequestsService: PlaceRequestsService,
  ) { }

  @Get('explores')
  @CacheKey('explores-places')
  @CacheTTL(1000 * 60 * 60 * 24)
  @UseInterceptors(CacheInterceptor)
  @ApiTags('places')
  async getExplores() {
    return this.placesService.getExplores();
  }

  @Post('requests')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('places/requests')
  async createRequest(
    @Request() req,
    @Body() dto: CreatePlaceRequestsDto,
  ) {
    return this.placeRequestsService.create(req.user.id, dto);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('places/reviews')
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
  @ApiTags('places/reviews')
  async getReviews(
    @Param('id') id: string
  ) {
    return this.placeReviewsService.getReviews(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('places')
  async getPlace(
    @Param('id') id: string
  ) {
    return this.placesService.getPlace(id);
  }
}
