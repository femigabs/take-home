import { Injectable, Inject } from '@nestjs/common';
import { IDatabase, ITask } from 'pg-promise';

@Injectable()
export class DatabaseRepository {
    constructor(@Inject('DATABASE_CONNECTION') private readonly db) { }

    async queryOne(query: string, values?: any[]): Promise<any> {
        try {
            return await this.db.one(query, values);
        } catch (error) {
            let message = error.message;
            if (error.code === '23505') {
                message = 'Data already exists'                
            };

            throw new Error(message);
        };
    };

    async queryOneOrNone(query: string, values?: any[]): Promise<any> {
        try {
            return await this.db.oneOrNone(query, values);
        } catch (error) {
            let message = error.message;
            if (error.code === '23505') {
                message = 'Data already exists'                
            };

            throw new Error(message);
        }
    };

    async queryNone(query: string, values?: any[]): Promise<void> {
        try {
            return await this.db.none(query, values);
        } catch (error) {
            throw new Error(`${error.message}`);
        };
    };

    async queryResult(query: string, values?: any[]): Promise<any> {
        try {
            return await this.db.result(query, values);
        } catch (error) {
            let message = error.message;
            if (error.code === '23505') {
                message = 'Data already exists'                
            };

            throw new Error(message);
        };
    };

    async queryAny(query: string, values?: any[]): Promise<any> {
        try {
           return await this.db.any(query, values);
        } catch (error) {
            let message = error.message;
            if (error.code === '23505') {
                message = 'Data already exists'                
            };

            throw new Error(message);
        };
    };

    async executeInTransaction<T>(callback: (db: IDatabase<any>, task: ITask<any>) => Promise<T>): Promise<T> {
        return this.db.tx(async (task) => {
            return callback(this.db, task);
        });
    }

}
