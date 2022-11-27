import { Controller, Post, Get, Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { User } from '@prisma/client';
import { GetUser, } from 'src/common/decorators';
import { UpdateAccountDto } from './common/dto'

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return this.userService.getMe(user);
    }

    @Patch('update-me')
    updateMe(@GetUser('id') userId: number, @Body() dto: UpdateAccountDto) {
        return this.userService.updateUserDetails(userId, dto);
    }

    @Delete('del-account')
    deleteMe(@GetUser('id') userId: number) {
        return this.userService.deleteAccount(userId);
    }
}
