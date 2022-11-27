import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './common/dto';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getAllProduct() {
        return this.prisma.product.findMany({});
    }

    async getProduct(prodId: number) {
        const prod = this.prisma.product.findUnique({
            where: {
                id: prodId
            }
        })
        if (!prod) {
            throw new NotFoundException(
                'No Product Found',
            );
        }
        return prod;
    }


    async addProduct(dto: ProductDto) {
        try {
            const prod = await this.prisma.product.create({
                data: {
                    ...dto,

                }
            });
            return prod;

        }
        catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Product name already exists',
                    );
                }
            }
            throw error;
        }


    }


    async updateProduct(prodId: number, dto: UpdateProductDto) {
        // get the product by id
        const prod =
            await this.prisma.product.findUnique({
                where: {
                    id: prodId,
                },
            });

        if (!prod) {
            throw new NotFoundException(
                'No Product Found',
            );
        }


        return this.prisma.product.update({
            where: {
                id: prod.id,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteProduct(prodId: number) {

        // get the product by id
        const prod =
            await this.prisma.product.findUnique({
                where: {
                    id: prodId,
                },
            });

        if (!prod) {
            throw new NotFoundException(
                'No Product Found',
            );
        }
        await this.prisma.product.delete({
            where: {
                id: prodId,
            },
        });

        return { message: "success" }
    }
}
