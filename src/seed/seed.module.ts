import { Logger, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeederService } from './seed.service';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],

    providers: [
        Logger, SeederService
    ],

})
export class SeederModule { }
