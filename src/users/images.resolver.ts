import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from '../images/images.service';
import { ImageType, UploadImageInput } from '../images/dto/image.dto';

@Resolver(() => ImageType)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query(() => [ImageType])
  async images() {
    return this.imagesService.findAll();
  }

  @Mutation(() => ImageType)
  async uploadImage(
    @Args('uploadImageInput') uploadImageInput: UploadImageInput,
  ) {
    return this.imagesService.upload(uploadImageInput);
  }
}
