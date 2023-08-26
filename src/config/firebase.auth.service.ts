
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
    async createUserWithEmailAndPassword(email: string, password: string): Promise<admin.auth.UserRecord> {
        try {
            const userCredential = await admin.auth().createUser({ email, password });

            return userCredential;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
        try {
            const userCredential = await admin.auth().getUserByEmail(email);

            return userCredential;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getUserByUid(uid: string): Promise<admin.auth.UserRecord> {
        try {
            const userRecord = await admin.auth().getUser(uid);
            return userRecord;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async generateToken(uid: string): Promise<string> {
        try {
            const customToken = await admin.auth().createCustomToken(uid);

            return customToken;
        } catch (error) {
            throw new Error(error.message);
        }
    };

}
