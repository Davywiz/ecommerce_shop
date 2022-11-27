import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { hash } from "bcrypt";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../types";




@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: config.get('JWT_SECRET'),
        });
    }


    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        if (!user) throw new UnauthorizedException();

        delete user.hash;
        delete user.hashedRt;
        return user;
    }
}