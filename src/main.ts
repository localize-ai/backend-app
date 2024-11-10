import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { firebaseSecret } from './core/firebase/firebase-secret';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerConfig } from './core/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Firebase
  admin.initializeApp({
    credential: admin.credential.cert(firebaseSecret),
  });

  // Global Prefix
  app.setGlobalPrefix('api');

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // CORS
  app.enableCors({
    origin: '*',
  });

  // Swagger configuration
  SwaggerConfig.config(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
