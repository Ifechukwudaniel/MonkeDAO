import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id!: number;

  @Field()
  body!: string;

  @Field(() => Int)
  rating!: number;

  /** Author */
  @Field(() => User)
  author!: User;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
