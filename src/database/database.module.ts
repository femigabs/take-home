import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as pgPromise from 'pg-promise';

const pgp = pgPromise();

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const dbUrlVarName = (nodeEnv === 'test') ? 'TEST_DATABASE_URL' : 'DATABASE_URL';
        const dbUrl = configService.get<string>(dbUrlVarName);
        try {
          const db = pgp(dbUrl);

          // try to connect to the database
          await db.connect();

          console.info('Database connected successfully')

          return db;
        } catch (error) {
          console.error('Database connection error:', error);
          throw new Error('Unable to connect to the database');
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})

export class DatabaseModule { };
