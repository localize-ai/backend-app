import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Users } from 'src/modules/users/schema/users.schema';

export type PlaceRequestsDocument = HydratedDocument<PlaceRequests>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
    collection: 'place_requests',
})
export class PlaceRequests {

    @Prop()
    url?: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Users.name,
    })
    user?: string;

    @Prop({
        enum: ['pending', 'approved', 'rejected'],
    })
    status: string;
}

export const PlaceRequestsSchema = SchemaFactory.createForClass(PlaceRequests);
