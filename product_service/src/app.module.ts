import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import {
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

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
  imports: [PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, categoryProviderRPC],
})
export class AppModule {
  static createMicroserviceOptions(): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RabbitMQ_PROD],
        queue: 'product-queue',
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
