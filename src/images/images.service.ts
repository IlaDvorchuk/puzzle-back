import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.schema';
import { UploadImageInput } from './dto/image.dto';
import { User } from '../users/user.schema';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async upload(uploadImageInput: UploadImageInput): Promise<Image> {
    const user = await this.userModel.findById(uploadImageInput.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newImage = new this.imageModel({
      url: uploadImageInput.url,
      user: user._id,
    });

    return newImage.save();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().populate('user').exec();
  }
}
