import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/common/guards';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    UserModule,
    ProductsModule,
    CartModule,
  ],

  providers: [{
    provide: APP_GUARD,
    useClass: JwtGuard
  },],

})
export class AppModule { }
