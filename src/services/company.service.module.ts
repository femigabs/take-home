import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AwsS3Service, FirebaseAuthService } from '../config';
import { DatabaseModule, DatabaseRepository } from 'src/database';


@Module({
    imports: [DatabaseModule],
    providers: [CompanyService, DatabaseRepository, FirebaseAuthService, AwsS3Service],
    exports: [CompanyService, DatabaseRepository, FirebaseAuthService, AwsS3Service],
})
export class CompanyModule { }
