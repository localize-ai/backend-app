import * as admin from 'firebase-admin';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth-login.dto';
import { UsersDocument } from '../users/schema/users.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginDto) {
        try {
            let user: UsersDocument;
            if (dto.id_token === process.env.TEST_EMAIL && process.env.NODE_ENV === 'development') {
                user = await this.usersService.findByEmail(process.env.TEST_EMAIL);
            } else {
                const payload = await admin.auth().verifyIdToken(dto.id_token);

                const profile = payload.picture.replace(/=s96-c$/, "");
                user = await this.usersService.findByEmail(payload.email);

                if (!user) {
                    user = await this.usersService.create({
                        name: payload.name,
                        email: payload.email,
                        profile,
                    });
                }
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

    async signToken(user: UsersDocument) {
        return await this.jwtService.signAsync({
            sub: {
                id: user.id,
                email: user.email,
            }
        });
    }
}
