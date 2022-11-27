import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { CartService } from './cart.service';
import { cartItemDto } from './common/dto';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }
    //todo
    //add to cart 
    //remove from cart
    //remove cart

    @Get()
    getCart(@GetUser('id') userId: number) {
        return this.cartService.getCart(userId);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    addToCart(@Body() cartDto: cartItemDto, @GetUser('id') userId: number) {
        return this.cartService.addToCart(cartDto, userId);
    }

    @Post('reduce-product-quantity')
    @HttpCode(HttpStatus.OK)
    removeProductQuantity(@Body() cartDto: cartItemDto, @GetUser('id') userId: number) {
        return this.cartService.removeProductQuantity(cartDto, userId);
    }

    @Post('remove-from-cart')
    @HttpCode(HttpStatus.OK)
    removeFromCart(@Body() cartDto: cartItemDto, @GetUser('id') userId: number) { 
        return this.cartService.removeFromCart(cartDto, userId);
    }

}
