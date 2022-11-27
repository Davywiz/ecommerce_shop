import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor(config: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: config.get('JWT_RT_SECRET'),
        });
    }

    validate(req: Request, payload: any) {

        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        };
    }
}