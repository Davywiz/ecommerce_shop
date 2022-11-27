import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { categories } from 'src/seed/common/interface';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }

    

    cleanDb() {
        return this.$transaction([
            this.user.deleteMany(),
            this.cart.deleteMany(),
            this.product.deleteMany(),
            this.ratings.deleteMany(),
            this.category.deleteMany(),
        ]);
    }
}
