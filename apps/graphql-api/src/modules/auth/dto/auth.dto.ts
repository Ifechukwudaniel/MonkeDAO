import { EmailField, PasswordField } from '@monkedeals/graphql';
import { InputType } from '@nestjs/graphql';

@InputType({ description: 'Login input' })
export class LoginInput {
  @EmailField({ description: 'Email address' })
  readonly email: string;

  @PasswordField({ description: 'Password' })
  readonly password: string;
}
