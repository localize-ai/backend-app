import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaceRequests } from "../schema/place_requests.schema";
import { CreatePlaceRequestsDto } from "../dto/create.place-requests.dto";

@Injectable()
export class PlaceRequestsService {

    constructor(
        @InjectModel(PlaceRequests.name) private readonly placeRequests: Model<PlaceRequests>,
    ) { }

    async create(
        userId: string,
        dto: CreatePlaceRequestsDto,
    ) {
        return this.placeRequests.create({
            user_id: userId,
            url: dto.url,
            status: 'pending',
        });
    }
}