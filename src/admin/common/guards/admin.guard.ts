import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { UserType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext) {
        const request: Express.Request = context
            .switchToHttp()
            .getRequest();


        const userId: number = request.user['id'];

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user) throw new UnauthorizedException();
        if (user.type !== UserType.ADMIN) {
            throw new UnauthorizedException('You don\'t have Admin previledges');
        }
        return true;
    }
}