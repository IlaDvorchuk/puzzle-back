import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { ImageType } from './dto/image.dto';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => ImageType)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query(() => [ImageType])
  async images() {
    return this.imagesService.findAll();
  }

  @Mutation(() => ImageType)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.imagesService.upload(file);
  }
}
