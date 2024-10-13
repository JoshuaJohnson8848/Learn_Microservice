import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microserviceOptions = AppModule.createMicroserviceOptions();
  const microservice = app.connectMicroservice<MicroserviceOptions>(microserviceOptions);

  const startMicroservice = async() => {
    try {
      await app.startAllMicroservices();
      console.log('Rabbit MQ Connected');
      
    } catch (error) {
      console.log(error);
    }
  }
  startMicroservice()

  await app.listen(5000);
}
bootstrap();
