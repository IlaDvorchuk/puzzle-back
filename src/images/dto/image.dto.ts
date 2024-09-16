import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class ImageType {
  @Field()
  _id: string;

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
