import { Public } from '@monkedeals/nest-common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/model/user.model';
import { AuthService } from './auth.service';
import { LoginInput, SignUpInput } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User, { name: 'signup', description: 'Sign up' })
  async signup(@Args('input') input: SignUpInput): Promise<User> {
    const { signature, walletAddress } = input;
    console.log(signature, walletAddress);
    return this.authService.signup(input);
  }

  @Public()
  @Mutation(() => User, { name: 'login', description: 'Sign in' })
  async login(@Args('input') input: LoginInput): Promise<User> {
    const { signature, walletAddress } = input;
    console.log(signature, walletAddress);
    return this.authService.login(input);
  }
}
