import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { UserType } from '../../users/dto/user.dto';

@ObjectType()
export class ImageType {
  @Field()
  id: string;

  @Field()
  url: string;

}

@InputType()
export class UploadImageInput {
  @Field()
  url: string;

  @Field()
  userId: string;
}
