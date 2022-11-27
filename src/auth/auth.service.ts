import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import { SignInDto, SignUpDto } from './common/dto';
import * as bcrypt from 'bcrypt';
import { hashData } from 'src/common/functions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: SignUpDto) {
        try {

            // hash password
            const hashPw = await hashData(dto.password);
            //create user
            const newuser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hashPw,
                    username: dto.username

                }
            });

            //create tokens
            const tokens = await this.getTokens(newuser.id, newuser.email);

            //update refresh token in db
            await this.updateRtHash(newuser.id, tokens.refresh_token)
            return tokens;
        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }


    async signin(dto: SignInDto) {
        try {
            //find user
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                }
            })

            if (!user) {
                throw new ForbiddenException("invalid username/password");
            }

            //compare password
            const pwMatches = await bcrypt.compare(dto.password, user.hash);

            // if password incorrect throw exception
            if (!pwMatches)
                throw new ForbiddenException(
                    "invalid username/password",
                );

            //create tokens
            const tokens = await this.getTokens(user.id, user.email);

            //update token in db
            await this.updateRtHash(user.id, tokens.refresh_token)
            return tokens;

        } catch (error) {
            throw error;
        }
    }


    async logout(userId: number) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null
            }
        });
        return { message: "LogOut Successfull" }
    }


    async refreshToken(userId: number, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user || !user.hashedRt) {
            throw new ForbiddenException("Access Denied");
        }

        const rtMatches = await bcrypt.compare(rt, user.hashedRt);
        if (!rtMatches) {
            throw new ForbiddenException("Access Denied");
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token)
        return tokens;
    }


    //helper functions
    
    async updateRtHash(userId: number, rt: string) {
        const hash = await hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash
            }
        });
    }

    async getTokens(userId: number, email: string) {
        const payload = {
            sub: userId,
            email,
        };
        const atSecret = this.config.get('JWT_SECRET');
        const RtSecret = this.config.get('JWT_RT_SECRET');


        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: atSecret,
                expiresIn: 60 * 60,
            }),

            this.jwtService.signAsync(payload, {
                secret: RtSecret,
                expiresIn: 60 * 60 * 24 * 7,
            })
        ]);

        return {
            access_token: at,
            refresh_token: rt
        }
    }

}
