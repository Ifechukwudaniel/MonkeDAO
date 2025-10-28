// import {
//   EmailField,
//   EmailFieldOptional,
//   PasswordField,
//   StringField,
//   StringFieldOptional,
//   URLFieldOptional,
// } from '@monkedeals/graphql';
// import { lowerCaseTransformer } from '@monkedeals/nest-common';
// import { InputType } from '@nestjs/graphql';
// import { Transform } from 'class-transformer';

// @InputType({ description: 'User register request' })
// export class CreateUserInput {b
//   @EmailField()
//   email: string;

//   @StringField()
//   @Transform(lowerCaseTransformer)
//   username: string;

//   @PasswordField()
//   password: string;
// }

// @InputType({ description: 'User update request' })
// export class UpdateUserInput {
//   @EmailFieldOptional()
//   email?: string;

//   @StringFieldOptional()
//   @Transform(lowerCaseTransformer)
//   username?: string;

//   @StringFieldOptional()
//   bio?: string;

//   @URLFieldOptional()
//   image?: string;
// }
