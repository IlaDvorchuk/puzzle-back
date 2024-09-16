import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';
import { ImageType } from './dto/image.dto';
import { User } from '../users/user.schema';
import { FileUpload } from 'graphql-upload-ts';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async upload(file: FileUpload): Promise<ImageType> {
    const { createReadStream, filename } = file;
    const uploadPath = path.join(__dirname, '../../static', filename);

    // Сохраняем файл на сервере с использованием async/await
    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(uploadPath))
        .on('finish', resolve)
        .on('error', reject);
    });

    // Сохраняем URL в базу данных
    const newImage = new this.imageModel({
      url: `/${filename}`,
    });

    const savedImage = await newImage.save();

    // Возвращаем данные о сохраненном изображении
    return {
      _id: savedImage._id.toString(),
      url: savedImage.url,
    };
  }

  async findAll(): Promise<Partial<Image>[]> {
    const images = await this.imageModel.find().exec();

    // Добавляем SERVER_URL в начало url каждого изображения
    const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
    return images.map((image) => {
      return {
        _id: image._id, // преобразуем документ Mongoose в обычный объект
        url: `${serverUrl}${image.url}`, // добавляем SERVER_URL к url
      };
    });
  }
}
