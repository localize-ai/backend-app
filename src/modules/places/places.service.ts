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

    private getPlaces(category: string) {
        return this.httpService.get(`https://llm.localizeai.laam.my.id/v1/places?q=Coffee%20Shop&category=${category}`).toPromise();
    }
}
