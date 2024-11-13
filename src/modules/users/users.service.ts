import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private readonly model: Model<Users>,
    ) { }

    async findOne(id): Promise<UsersDocument> {
        return await this.model.findOne({
            _id: id,
        });
    }

    async findByEmail(email: string): Promise<UsersDocument> {
        return await this.model.findOne({
            email: email,
        });
    }

    async create(user: Users): Promise<UsersDocument> {
        return await this.model.create(user);
    }

    async updateUsername(id: string, username: string): Promise<UsersDocument> {
        return await this.model.findOneAndUpdate(
            { _id: id },
            {
                username: username,
            },
            { new: true },
        );
    }

    async addReviewCount(id: string) {
        return await this.model.findOneAndUpdate(
            { _id: id },
            {
                $inc: { total_reviews: 1 },
            },
        );
    }

    async isUsernameExists(username: string): Promise<boolean> {
        const user = await this.model.findOne({
            username:
                username,
        });
        return !!user;
    }
}