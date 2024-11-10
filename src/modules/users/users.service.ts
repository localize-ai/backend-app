import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly model: Model<User>,
    ) { }

    async findOne(id): Promise<UserDocument> {
        return await this.model.findOne({
            _id: id,
        });
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return await this.model.findOne({
            email: email,
        });
    }

    async create(user: User): Promise<UserDocument> {
        return await this.model.create(user);
    }

    async updateUsername(id: string, username: string): Promise<UserDocument> {
        return await this.model.findOneAndUpdate(
            { _id: id },
            {
                username: username,
            },
            { new: true },
        );
    }
}
