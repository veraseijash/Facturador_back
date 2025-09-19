import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common'; // <-- Importar ValidationPipe

async function bootstrap() {
  // Tipar como NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Carpeta pública
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public', // URL: /public/...
  });

  // ✅ Habilitar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan campos extra
      transform: true, // transforma automáticamente tipos (string → number, etc.)
    }),
  );

  await app.listen(3000);
}
bootstrap();
