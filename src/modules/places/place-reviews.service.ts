import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaceReviews } from "./schema/place_reviews.schema";
import { CreatePlaceReviewsDto } from "./dto/create.place-reviews.dto";

@Injectable()
export class PlaceReviewsService {

    constructor(
        @InjectModel(PlaceReviews.name) private readonly placeReviews: Model<PlaceReviews>,
    ) { }

    async create(
        userId: string,
        placeId: string,
        dto: CreatePlaceReviewsDto
    ) {
        return this.placeReviews.create({
            user_id: userId,
            place_id: placeId,
            rating: dto.rating,
            review: dto.review,
            images: dto.images,
        });
    }

    async getReviews(placeId: string) {
        return this.placeReviews
            .find({ place_id: placeId })
            .sort({ created_at: -1 });
    }
}