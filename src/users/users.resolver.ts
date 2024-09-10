import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/user.dto';
import { CreateUserInput } from './dto/user.dto';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
