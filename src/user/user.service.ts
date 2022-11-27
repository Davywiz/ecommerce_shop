import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAccountDto } from './common/dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    getMe(user: User) {
        return user;
    }

    async updateUserDetails(userId: number, dto: UpdateAccountDto) {
        const update = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            },

            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                address: true,
            }
        });

        return update;
    }

    async deleteAccount(userId: number,) {

        await this.prisma.$transaction([
            this.prisma.user.delete({
                where: {
                    id: userId
                },
            }),
            this.prisma.cart.delete({
                where: {
                    userId: userId,
                },
            })
        ]);

        return { message: 'success' }

    }
}
