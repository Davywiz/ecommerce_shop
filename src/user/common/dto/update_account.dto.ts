import { IsOptional, IsString } from "class-validator"

export class UpdateAccountDto {

    @IsString()
    @IsOptional()
    firstName?: string


    @IsString()
    @IsOptional()
    lastName?: string


    @IsString()
    @IsOptional()
    address?: string
}