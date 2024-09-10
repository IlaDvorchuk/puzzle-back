import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesService } from './images.service';
import { ImageSchema, Image } from './image.schema';
import { User, UserSchema } from '../users/user.schema';
import { ImagesResolver } from './images.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ImagesService, ImagesResolver],
})
export class ImagesModule {}
