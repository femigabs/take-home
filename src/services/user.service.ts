import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { CreateUserEntity, LoginUserEntity } from '../entities/user.entity';
import { DatabaseRepository, UserQueries } from '../database';
import { FirebaseAuthService } from '../config';

@Injectable()
export class UserService {
    constructor(
        private readonly databaseRepository: DatabaseRepository,
        private readonly firebaseAuthService: FirebaseAuthService,
    ) { }

    // todo: handle if database error occur exception
    async createUser(data: CreateUserDto): Promise<CreateUserEntity> {

        const firebase_user = await this.firebaseAuthService.createUserWithEmailAndPassword(data.email, data.password);

        if (firebase_user) {
            const payload = [
                data.first_name,
                data.last_name,
                data.email,
                firebase_user.uid
            ];

            const user = await this.databaseRepository.queryOne(UserQueries.createUser, payload);

            return user;

        }
    };

    async loginUser(data: LoginUserDto): Promise<LoginUserEntity> {
        // Authenticate user using Firebase Auth
        const firebaseRecord = await this.firebaseAuthService.getUserByEmail(data.email);
        console.log("🚀 ~ file: user.service.ts:38 ~ UserService ~ loginUser ~ firebaseRecord:", firebaseRecord)

        const error = { message: 'Invalid credentials', code: 401 };

        if (!firebaseRecord) {
            throw error;
        };

        const user: CreateUserEntity = await this.databaseRepository.queryOne(UserQueries.getUserByFirebaseUId, [firebaseRecord.uid]);
        console.log("🚀 ~ file: user.service.ts:47 ~ UserService ~ loginUser ~ user:", user)

        if (!user) {
            throw error;
        };

        // todo: handle password check

        // Generate a custom token using Firebase
        const token = await this.firebaseAuthService.generateToken(firebaseRecord.uid);

        return {
            uid: firebaseRecord.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: firebaseRecord.email,
            disabled: firebaseRecord.disabled,
            token: token,
        };
    };
}
