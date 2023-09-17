import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.config.get<string>('AWS_REGION'),
  });

  constructor(private readonly config: ConfigService) {}

  public async upload(filename: string, file: Buffer) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.get<string>('AWS_BUCKET'),
        Key: filename,
        Body: file,
      }),
    );
  }

  public async getFile(filename: string = 'image.jpeg') {
    const file = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.config.get<string>('AWS_BUCKET'),
        Key: 'image.jpeg',
      }),
    );
    console.log(file);
  }
}
