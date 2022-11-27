import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { toNumber } from "src/common/helpers";

export class CategoryDto {

    @Transform(({ value }) => toNumber(value))
    @IsNumber()
    @IsNotEmpty()
    category: number;
}

