import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Places } from '../schema/places.schema';
import { Model } from 'mongoose';
import { GetPlacesCategoryDto } from '../dto/get.places.dto';
import { PlaceEnum } from '../enum/place.enum';
import redis from 'src/core/redis/redis_client';
import { EXPLORE_PLACES_REDIS_KEY } from 'src/core/redis/redis_constant';

@Injectable()
export class PlacesService {

    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Places.name) private readonly model: Model<Places>,
    ) { }

    async getPlace(id: string) {
        return this.model.findOne({ _id: id });
    }

    async getPlaceByCategory(dto: GetPlacesCategoryDto) {
        const result = await this.getPlaces(dto.category, 20);
        return result.data;
    }

    async getExplores() {
        // Check cache
        const cachedData = await redis.get(EXPLORE_PLACES_REDIS_KEY);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Fetch data
        const promises = await Promise.all([
            this.getPlaces(PlaceEnum.HIDDEN_GEM),
            this.getPlaces(PlaceEnum.WORK_FRIENDLY),
            this.getPlaces(PlaceEnum.COZY_ATMOSPHERE),
            this.getPlaces(PlaceEnum.PET_FRIENDLY),
            this.getPlaces(PlaceEnum.CLASSIC_VIBES),
        ]);

        // Prepare data
        const data = {
            "Hidden Gem": promises[0].data,
            "Work Friendly": promises[1].data,
            "Cozy Atmosphere": promises[2].data,
            "Pet Friendly": promises[3].data,
            "Classic Vibes": promises[4].data,
        };

        // Cache for 1 day
        await redis.set(EXPLORE_PLACES_REDIS_KEY, JSON.stringify(data), 'EX', 60 * 60 * 24); // 1 day

        // Return data
        return data;
    }

    private async getPlaces(
        category: string,
        limit: number = 10,
    ) {
        const maxRetries = 3;
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                return await this.httpService.get(`https://llm.localizeai.online/v1/places?q=Coffee%20Shop&limit=${limit}&category=${category}`).toPromise();
            } catch (error) {
                attempts++;
                if (attempts >= maxRetries) {
                    throw new Error(`Failed to fetch places for category ${category} after ${maxRetries} attempts`);
                }
            }
        }
    }
}
