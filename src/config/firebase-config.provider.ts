import { ConfigService } from '@nestjs/config';

export const firebaseConfigProvider = {
  provide: 'FIREBASE_CONFIG',
  useFactory: (configService: ConfigService) => ({
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  }),
  inject: [ConfigService],
};
