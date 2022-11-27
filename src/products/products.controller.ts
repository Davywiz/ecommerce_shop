import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { CategoryDto, Rating } from './common/dto';
import { SerializeInterceptor } from './common/interceptors';
import { ProductsService } from './products.service';

@UseInterceptors(new SerializeInterceptor())
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    //todo
    // get deal of the day


    @Get('category')
    getCategoryProducts(@Query() queryDto: CategoryDto) {
        return this.productsService.getCategoryProducts(queryDto.category);
    }

    @Get('search/:name')
    searchProducts(@Param('name') name: string) {
        return this.productsService.searchProducts(name);
    }


    @Get('/:prodId')
    getProduct(@Param('prodId', ParseIntPipe) prodId: number) {
        return this.productsService.getProduct(prodId);
    }

    @Post('/rate-product')
    rateProduct(@Body() rating: Rating, @GetUser('id') userId: number) {
        return this.productsService.rateProduct(rating, userId);
    }
}

