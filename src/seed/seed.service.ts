import { Injectable, Logger } from "@nestjs/common";
import { hashData } from "src/common/functions";
import { categories, products } from "src/seed/common/interface";
import { Admin } from "src/seed/common/interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private prisma: PrismaService

  ) { }
  async seed() {
    await this.createModels()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding models...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding models...');
        Promise.reject(error);
      });
  }

  async createModels() {
    return await Promise.all([
      this.createAdmin(),
      this.createCategory(),
    ])
      .then(createdModels => {
        this.createProducts().then(
          () => {
            this.logger.debug(
              'Products  Creaeted'
            );
            return Promise.resolve(true);
          }
        ).catch(error => Promise.reject(error));
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of models created : ' +
          //return only created models.
          createdModels.length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async createAdmin() {
    const hashPw = await hashData(Admin.password);
    await this.prisma.user.upsert({
      where: { email: Admin.email },
      update: {},
      create: {
        email: Admin.email,
        username: Admin.username,
        hash: hashPw,
        type: Admin.type
      }
    });
  }

  async createCategory() {
    await Promise.all([
      categories.map(async ({ id, name }) => {
        await this.prisma.category.upsert({
          where: { id },
          update: {},
          create: { id, name }
        })
      })
    ]);

  }

  async createProducts() {
    await Promise.all([
      products.map(async ({ ...prod }) => {
        await this.prisma.product.upsert({
          where: { id: prod.id },
          update: {},
          create: { ...prod }
        })
      })
    ]);

  }
}