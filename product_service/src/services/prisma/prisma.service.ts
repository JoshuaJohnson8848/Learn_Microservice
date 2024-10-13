import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(){
        super()
    }

    async onModuleInit() {
        await this.$connect();
        console.log(`Server listening at PORT ${process.env.PORT} successfully`);
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('server disconnected');
    }
}
