import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService],
  imports: [HttpModule],
})
export class PlacesModule { }
