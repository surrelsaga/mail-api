import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // to enforce the DTO shape on the JSON received from client (POST)
  // whitelist: true -> removes any field that has no decorator in the DTO
  // forbid...: true -> rejects the whole req with 400, if the json contains extra fields that are not defined in the DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // every HttpException (404, 409, 400...) goes through the filter and comes out in one shape
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
