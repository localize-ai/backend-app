import { Module } from '@nestjs/common';
import { PlacesService } from './services/places.service';
import { PlacesController } from './places.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Places, PlacesSchema } from './schema/places.schema';
import { PlaceReviews, PlaceReviewsSchema } from './schema/place_reviews.schema';
import { PlaceReviewsService } from './services/place-reviews.service';
import { PlaceRequestsService } from './services/place-requests.service';
import { PlaceRequests, PlaceRequestsSchema } from './schema/place_requests.schema';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PlacesController],
  providers: [
    PlacesService,
    PlaceReviewsService,
    PlaceRequestsService,
  ],
  imports: [
    HttpModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Places.name,
        schema: PlacesSchema,
      },
      {
        name: PlaceReviews.name,
        schema: PlaceReviewsSchema,
      },
      {
        name: PlaceRequests.name,
        schema: PlaceRequestsSchema,
      },
    ]),
  ],
})
export class PlacesModule { }
