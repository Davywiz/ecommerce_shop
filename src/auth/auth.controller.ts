import { Controller, Post, Get, HttpStatus } from '@nestjs/common';
import { Body, HttpCode, UseGuards } from '@nestjs/common/decorators';
import { GetUser, Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './common/dto';
import { JwtGuardRefresh } from './common/guards';
import { Tokens } from './common/types';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    signup(@Body() dto: SignUpDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SignInDto): Promise<Tokens> {
        return this.authService.signin(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetUser('sub') id: number) {
        return this.authService.logout(id);
    }

    @Public()
    @UseGuards(JwtGuardRefresh)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetUser('sub') id: number, @GetUser('refreshToken') rt: string) {
        return this.authService.refreshToken(id, rt);
    }
}
