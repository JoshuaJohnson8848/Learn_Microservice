import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/services/products/products.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const categoryProviderRPC = {
  provide: 'CATEGORY_SERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RabbitMQ],
        queue: 'category-queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  },
};

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, categoryProviderRPC]
})
export class ProductsModule {}
