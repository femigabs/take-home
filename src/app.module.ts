import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule, firebaseConfigProvider } from './config';
import { UserController, CompanyController } from './controllers';
import { ResponseService } from './utils';
import { UserModule } from './services';
import { CompanyModule } from './services/company.service.module';

@Module({
  imports: [
    ConfigAppModule,
    UserModule,
    CompanyModule
  ],
  controllers: [AppController, UserController, CompanyController],
  providers: [AppService, firebaseConfigProvider, ResponseService],
})

export class AppModule {};
