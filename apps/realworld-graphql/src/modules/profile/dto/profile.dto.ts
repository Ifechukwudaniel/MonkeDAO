import { ArgsType } from '@nestjs/graphql';
import { StringField } from '@monkedeals/graphql';

@ArgsType()
export class UsernameArgs {
  @StringField({
    description: 'Username of the profile',
  })
  username: string;
}
