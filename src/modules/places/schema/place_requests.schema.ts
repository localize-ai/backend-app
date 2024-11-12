import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlaceRequestsDocument = HydratedDocument<PlaceRequests>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
    collection: 'place_reviews',
})
export class PlaceRequests {

    @Prop()
    url?: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    })
    user_id?: string;

    @Prop({
        enum: ['pending', 'approved', 'rejected'],
    })
    status: string;
}

export const PlaceRequestsSchema = SchemaFactory.createForClass(PlaceRequests);
