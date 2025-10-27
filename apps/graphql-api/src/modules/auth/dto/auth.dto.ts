import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Login input using a Solana signature and public key',
})
export class LoginInput {
  @Field(() => String, {
    description: 'User signature (base58/base64 encoded string)',
  })
  readonly signature: string;

  @Field(() => String, {
    description: 'User’s public key (base58 encoded Solana address)',
  })
  readonly walletAddress: string;
}

@InputType({
  description: 'Sign up input using a Solana wallet signature and public key',
})
export class SignUpInput {
  @Field(() => String, {
    description: 'User signature (base58/base64 encoded string)',
  })
  readonly signature: string;

  @Field(() => String, {
    description: 'User’s public key (base58 encoded Solana wallet address)',
  })
  readonly walletAddress: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional username or display name',
  })
  readonly name?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Optional email for the user',
  })
  readonly email?: string;
}
