import { CurrentUser } from '@monkedeals/graphql';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UpdateUserInput } from './dto/user.dto';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => User, {
    name: 'currentUser',
    description: 'Get current user (from token)',
  })
  async currentUser(
    @CurrentUser() user: { id: number; token: string },
  ): Promise<User> {
    return this.userService.get(user);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Update current user',
  })
  async updateUser(
    @CurrentUser('id') userId: number,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(userId, input);
  }

  @ResolveField()
  async token(@Parent() user: User) {
    return await this.authService.createToken({ id: user.id });
  }
}
