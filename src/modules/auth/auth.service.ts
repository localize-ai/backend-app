import * as admin from 'firebase-admin';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth-login.dto';
import { UserDocument } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginDto) {
        try {
            const payload = await admin.auth().verifyIdToken(dto.id_token);

            const profile = payload.picture.replace(/=s96-c$/, "");
            let user = await this.usersService.findByEmail(payload.email);

            if (!user) {
                user = await this.usersService.create({
                    name: payload.name,
                    email: payload.email,
                    profile,
                });
            }

            const token = await this.signToken(user);
            return {
                user,
                token,
            };
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async signToken(user: UserDocument) {
        return await this.jwtService.signAsync({
            sub: {
                id: user.id,
                email: user.email,
            }
        });
    }
}
