import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaceReviews } from "../schema/place_reviews.schema";
import { CreatePlaceReviewsDto } from "../dto/create.place-reviews.dto";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class PlaceReviewsService {

    constructor(
        @InjectModel(PlaceReviews.name) private readonly placeReviews: Model<PlaceReviews>,
        private usersService: UsersService,
    ) { }

    async create(
        userId: string,
        placeId: string,
        dto: CreatePlaceReviewsDto
    ) {
        if (userId) {
            // Add review count to user
            await this.usersService.addReviewCount(userId);
        }

        return this.placeReviews.create({
            user: userId,
            place_id: placeId,
            rating: dto.rating,
            review: dto.review,
            images: dto.images,
        });
    }

    async getReviews(placeId: string) {
        return this.placeReviews
            .find({ place_id: placeId })
            .sort({ created_at: -1 })
            .populate('user', 'name email username total_reviews profile bio');
    }
}