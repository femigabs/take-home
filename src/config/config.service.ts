import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    DATABASE_URL = this.configService.get<string>('DATABASE_URL');

    PORT = this.configService.get<string>('PORT');

    API_HOST = this.configService.get<string>('API_HOST');

    NODE_ENV = this.configService.get<string>('NODE_ENV');

    AWS_ACCESS_KEY_ID = this.configService.get<string>('AWS_ACCESS_KEY_ID');

    AWS_SECRET_ACCESS_KEY = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    AWS_REGION = this.configService.get<string>('AWS_REGION');

    AWS_BUCKET_NAME = this.configService.get<string>('AWS_BUCKET_NAME');

}
