import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthService } from '../config';
import { DatabaseModule, DatabaseRepository } from 'src/database';


@Module({
    imports: [DatabaseModule],
    providers: [UserService, DatabaseRepository, FirebaseAuthService],
    exports: [UserService, DatabaseRepository, FirebaseAuthService],
})
export class UserModule { }
