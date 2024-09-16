import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'; // Importar cookie-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    // {
    // origin: 'https://raudel-gomez-smith.de',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,  // Si estás usando cookies de sesión
    // }
  );
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  
  await app.listen(3000);
}
bootstrap();
