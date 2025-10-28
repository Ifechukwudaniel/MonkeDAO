import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Comment } from '../../comment/model/comment.model';
// import { Deal } from '../../deal/model/deal.model';

@ObjectType()
export class Merchant {
  @Field(() => ID)
  id!: number;

  @Field()
  slug!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  walletAddress?: string;

  @Field()
  verifiedMerchant!: boolean;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  externalId?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  /** Relations */

  // @Field(() => [Deal], { nullable: 'itemsAndList' })
  // deals!: Deal[];

  // @Field(() => [String], { nullable: 'itemsAndList' })
  // tags!: string[];

  // @Field(() => [Comment], { nullable: 'itemsAndList' })
  // comments!: Comment[];
}
