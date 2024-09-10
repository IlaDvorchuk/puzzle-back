// users/dto/user.dto.ts
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
