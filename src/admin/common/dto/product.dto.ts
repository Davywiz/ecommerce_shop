import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    description: string;

    @IsArray()
    @IsNotEmpty()
    images: string[];

    @IsNotEmpty()
    categoryId: number;

}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    images?: string[];


    @IsOptional()
    categoryId?: number;

}