import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem, Product, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { cartItemDto } from './common/dto';

@Injectable()
export class CartService {
    constructor(private prismaService: PrismaService) {

    }


    async getCart(userId: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                cart: {
                    include: {
                        CartItem: {
                            include: {
                                product: true
                            }
                        }

                    }
                }
            }
        });

        return user.cart.CartItem;
    }


    async addToCart(cartDto: cartItemDto, userId: number) {
        let newQuantity = 1;
        let addCart: User & {
            cart: Cart & {
                CartItem: (CartItem & {
                    product: Product;
                })[];
            };
        }

        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                cart: true
            }
        });
        const product = await this.prismaService.product.findUnique({
            where: {
                id: cartDto.productId,
            },

        });
        if (!product) {
            throw new NotFoundException('Can\'t find product to add to cart')
        }

        if (user.cart === null) {
            addCart = await this.addToCartIfNotExist(userId, newQuantity, cartDto);
        } else {
            addCart = await this.addToCartIfCartExists(userId, newQuantity, cartDto, user.cart.id)
        }

        return addCart.cart.CartItem;
    }


    async removeProductQuantity(cartDto: cartItemDto, userId: number) {
        const user = await this.checkUserAndCart(userId, cartDto);

        const updateCartItem = await this.prismaService.cartItem.update({
            where: {
                cartId_productId: { cartId: user.cart.id, productId: cartDto.productId }
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        });

        if (updateCartItem.quantity === 0) {
            await this.prismaService.cartItem.delete({
                where: {
                    cartId_productId: { cartId: user.cart.id, productId: cartDto.productId }
                },
            })
        }

        return await this.getCart(userId);

    }


    async removeFromCart(cartDto: cartItemDto, userId: number) {

        const user = await this.checkUserAndCart(userId, cartDto);

        const ifExist = await this.prismaService.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: user.cart.id, productId: cartDto.productId }
            },
        })

        if (!ifExist) {
            throw new NotFoundException();
        }
        
        await this.prismaService.cartItem.delete({
            where: {
                cartId_productId: { cartId: user.cart.id, productId: cartDto.productId }
            },
        })


        return await this.getCart(userId);

    }


    //helper functions
    async checkUserAndCart(userId: number, cartDto: cartItemDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                cart: true
            }
        });
        if (user.cart === null) {
            throw new NotFoundException('No cart found')
        }
        const product = await this.prismaService.product.findUnique({
            where: {
                id: cartDto.productId,
            },

        });
        if (!product) {
            throw new NotFoundException('Can\'t find product to add to cart')
        }

        return user;
    }

    addToCartIfNotExist(userId: number, newQuantity: number, cartDto: cartItemDto) {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                cart: {
                    create: {
                        CartItem: {
                            create: {
                                quantity: newQuantity,
                                productId: cartDto.productId
                            }
                        }
                    },

                }
            },
            include: {
                cart: {
                    include: {
                        CartItem: {
                            include: {
                                product: true
                            }
                        }

                    }
                }
            }
        });
    }

    addToCartIfCartExists(userId: number, newQuantity: number, cartDto: cartItemDto, cartId: number) {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                cart: {
                    update: {
                        CartItem: {
                            upsert: {
                                where: {
                                    cartId_productId: { cartId, productId: cartDto.productId }
                                },
                                update: {
                                    quantity: {
                                        increment: 1
                                    },
                                },
                                create: {
                                    quantity: newQuantity,
                                    productId: cartDto.productId
                                },
                            }
                        }
                    },
                }
            },
            include: {
                cart: {
                    include: {
                        CartItem: {
                            include: {
                                product: true
                            }
                        }

                    }
                }
            }
        });
    }
}
