import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';
import { ImageType } from './dto/image.dto';
import { User } from '../users/user.schema';
import { FileUpload } from 'graphql-upload-ts';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async upload(file: FileUpload): Promise<ImageType> {
    const { createReadStream, filename } = file;
    const uploadPath = path.join(__dirname, '../../uploads', filename);

    // Сохранение файла на сервер
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(fs.createWriteStream(uploadPath))
        .on('finish', () => {
          // Верните данные о загруженном изображении (например, URL или путь к файлу)
          resolve({
            id: '1',
            url: `/uploads/${filename}`,
          });
        })
        .on('error', reject);
    });
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().populate('user').exec();
  }
}
