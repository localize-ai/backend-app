import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
})
export class Users {

    @Prop({ isRequired: true })
    name: string;

    @Prop({
        isRequired: false,
        unique: true,
    })
    username?: string;

    @Prop({
        isRequired: true,
        unique: true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

    })
    email: string;

    @Prop()
    bio?: string;

    @Prop()
    profile?: string;

    created_at?: Date;
    updated_at?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
