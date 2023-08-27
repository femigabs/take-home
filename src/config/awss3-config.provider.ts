import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async uploadImage(fileBuffer: Buffer, originalFilename: string): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const key = `${uuidv4()}-${originalFilename}`;
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
    };

    try {
      const result = await this.s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      throw new Error('Error uploading image');
    }
  }
}
