import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  await app.listen(3000);
}
bootstrap();
