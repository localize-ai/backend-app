import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlacesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    async getExplores() {
        const promises = await Promise.all([
            this.getPlaces('hidden_gem'),
            this.getPlaces('work_friendly'),
            this.getPlaces('cozy_atmosphere'),
            this.getPlaces('pet_friendly'),
            this.getPlaces('classic_vibes'),
        ]);

        return {
            "Hidden Gem": promises[0].data,
            "Work Friendly": promises[1].data,
            "Cozy Atmosphere": promises[2].data,
            "Pet Friendly": promises[3].data,
            "Classic Vibes": promises[4].data,
        };
    }

    private async getPlaces(category: string) {
        const maxRetries = 3;
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                return await this.httpService.get(`https://llm.localizeai.online/v1/places?q=Coffee%20Shop&category=${category}`).toPromise();
            } catch (error) {
                attempts++;
                if (attempts >= maxRetries) {
                    throw new Error(`Failed to fetch places for category ${category} after ${maxRetries} attempts`);
                }
            }
        }
    }
}
