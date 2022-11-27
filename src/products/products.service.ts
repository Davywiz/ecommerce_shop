import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { Rating } from './common/dto';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }


    async getCategoryProducts(category: number) {

        const catProducts = await this.prismaService.category.findUnique({
            where: { id: category },
            include: {
                Product: {
                    include: { rating: true }
                }
            }
        });
        if (!catProducts) {
            throw new NotFoundException('Category Not Found');
        }
        return catProducts.Product;
    }


    async searchProducts(name: string) {
        const prod = await this.prismaService.product.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                },

            },
            include: { rating: true }
        });
        return prod;
    }


    async getProduct(prodId: number) {

        const prod = await this.prismaService.product.findUnique({
            where: {
                id: prodId
            },
            include: {
                rating: true
            }

        });
        return prod;
    }

    async rateProduct(rating: Rating, userId: number) {
        // update product ratings by upsert
        try {
            const ratedProduct = await this.prismaService.product.update({
                where: { id: rating.productId },
                data: {
                    rating: {
                        upsert: {
                            where: { userId_productId: { userId, productId: rating.productId } },
                            update: {
                                givenRating: rating.userRating,
                            },
                            create: {
                                userId: userId,
                                givenRating: rating.userRating,
                            },
                        },
                    },
                },
                include: {
                    rating: true,
                }
            });

            return ratedProduct;
        }
        catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                throw new NotFoundException(
                    'An error Occurred, product might not exist',
                );

            }
            throw error;
        }

    }

    //deal of the day
}
