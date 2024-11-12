import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Places, PlacesSchema } from './schema/places.schema';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Places.name,
        schema: PlacesSchema,
      },
    ]),
  ],
})
export class PlacesModule { }
