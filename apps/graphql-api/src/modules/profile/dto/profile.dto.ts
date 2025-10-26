import { StringField } from '@monkedeals/graphql';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UsernameArgs {
  @StringField({
    description: 'Username of the profile',
  })
  username: string;
}
