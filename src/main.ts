import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.enableCors(
    // {
    // origin: 'https://raudel-gomez-smith.de',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,  // Si estás usando cookies de sesión
    // }
  );
  await app.listen(3000);
}
bootstrap();
