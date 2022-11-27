import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private catService: CartService) { }
    //todo
    //add to cart 
    //remove from cart
    //remove cart

    @Get()
    getCart(@GetUser('id') userId: number) {
        this.catService.getCart(userId);
    }

    @Post()
    addToCart() { }

    @Post()
    @HttpCode(HttpStatus.OK)
    removeProductQuantity() { }

    @Post()
    @HttpCode(HttpStatus.OK)
    deleteCart() { }

}
