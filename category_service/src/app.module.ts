import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static createMicroserviceOptions(): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RabbitMQ],
        queue: 'category-queue',
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
