import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DatabaseRepository, UserQueries } from '../database';

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
  constructor(private readonly databaseRepository: DatabaseRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const user = await this.databaseRepository.queryOneOrNone(UserQueries.getUserByEmail, [email]);

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    next();
  }
}
