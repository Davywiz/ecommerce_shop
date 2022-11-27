import { IsNotEmpty, IsNumber } from "class-validator";

export class cartItemDto {
    @IsNotEmpty()
    @IsNumber()
    productId : number;

}