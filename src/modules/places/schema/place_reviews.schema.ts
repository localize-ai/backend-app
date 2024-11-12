import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlaceReviewsDocument = HydratedDocument<PlaceReviews>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
    collection: 'place_reviews',
})
export class PlaceReviews {

    @Prop({ isRequired: true })
    place_id: mongoose.Types.ObjectId;

    @Prop({ isRequired: true })
    rating: number;

    @Prop()
    review?: string;

    @Prop()
    images?: string[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    })
    user_id?: string;
}

export const PlaceReviewsSchema = SchemaFactory.createForClass(PlaceReviews);
