import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Places, PlacesSchema } from './schema/places.schema';
import { PlaceReviews, PlaceReviewsSchema } from './schema/place_reviews.schema';
import { PlaceReviewsService } from './place-reviews.service';

@Module({
  controllers: [PlacesController],
  providers: [
    PlacesService,
    PlaceReviewsService,
  ],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Places.name,
        schema: PlacesSchema,
      },
      {
        name: PlaceReviews.name,
        schema: PlaceReviewsSchema,
      }
    ]),
  ],
})
export class PlacesModule { }
