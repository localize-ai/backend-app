import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlacesDocument = HydratedDocument<Places>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
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
