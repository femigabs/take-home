import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { firebaseConfigProvider } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Initialize Firebase Auth module
  const firebaseConfig = app.get(firebaseConfigProvider.provide);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });

  // Default to 3000 if PORT is not set
  const port = configService.get<number>('PORT', 3000);

  app.enableCors();

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

