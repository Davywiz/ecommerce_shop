import { IsNotEmpty, IsNumber } from "class-validator";

export class Rating {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    userRating: number;
}