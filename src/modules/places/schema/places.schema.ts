import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PlaceReviews } from './place_reviews.schema';

export type PlacesDocument = HydratedDocument<Places>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
    collection: 'places',
    virtuals: true,
})
export class Places {
    /**
     * _id
 title
 categories
 address
 review_count
 review_rating
 description
 open_hours
 popular_times
 web_site
 phone
 plus_code
 reviews_per_rating
 latitude
 longtitude
 reviews_link
 price_range
 menu
 reservations
 order_online
 about
 images
     */

    @Prop()
    _id: string;
}

export const PlacesSchema = SchemaFactory.createForClass(Places);

PlacesSchema.virtual('reviews', {
    ref: PlaceReviews.name,
    localField: '_id',
    foreignField: 'place_id',
});
PlacesSchema.set('toJSON', { virtuals: true })
PlacesSchema.set('toObject', { virtuals: true })
