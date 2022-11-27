import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class SignUpDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}

export class SignInDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}