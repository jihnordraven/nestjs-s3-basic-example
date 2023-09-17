import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: any): Promise<any> {
    return this.uploadService.upload(file.originalname, file.buffer);
  }

  @Get()
  public async getFile(): Promise<any> {
    return this.uploadService.getFile();
  }
}
