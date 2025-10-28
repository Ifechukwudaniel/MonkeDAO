import { EmailField, StringField } from '@monkedeals/graphql';
import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Login input using a Solana signature and public key',
})
export class LoginInput {
  @StringField({ description: 'User signature (base58/base64 encoded string)' })
  readonly signature: string;

  @StringField({
    description: 'User’s public key (base58 encoded Solana wallet address)',
  })
  readonly walletAddress: string;
}

@InputType({
  description: 'Sign up input using a Solana wallet signature and public key',
})
export class SignUpInput {
  @StringField({ description: 'User signature (base58/base64 encoded string)' })
  readonly signature: string;

  @StringField({
    description: 'User’s public key (base58 encoded Solana wallet address)',
  })
  readonly walletAddress: string;

  @StringField({
    nullable: true,
    description: 'Optional name',
  })
  readonly name?: string;

  @EmailField({
    nullable: true,
    description: 'Optional email address',
  })
  readonly email?: string;
}
