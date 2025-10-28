import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
// import { Comment } from '../../comment/model/comment.model';
// import { Merchant } from '../../merchant/model/merchant.model';
// import { DealLocation } from './deal-location.model';
// import { DealNFT } from './deal-nft.model';
// import { DealOption } from './deal-option.model';

export enum DealCategory {
  FLIGHT = 'flight',
  HOTEL = 'hotel',
  PRODUCT = 'product',
  EXPERIENCE = 'experience',
}

registerEnumType(DealCategory, {
  name: 'DealCategory',
  description: 'Category of the deal',
});

@ObjectType()
export class Deal {
  @Field(() => ID)
  id!: number;

  @Field()
  slug!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  subCategory?: string;

  @Field(() => Float, { nullable: true })
  originalPrice?: number;

  @Field(() => Float, { nullable: true })
  discountedPrice?: number;

  @Field(() => Float, { nullable: true })
  discountPercent?: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  externalId?: string;

  @Field({ nullable: true })
  externalUrl?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  featured!: boolean;

  @Field()
  active!: boolean;

  @Field()
  source!: string;

  // @Field(() => Merchant, { nullable: true })
  // merchant?: Merchant;

  // @Field(() => DealLocation, { nullable: true })
  // location?: DealLocation;

  // @Field(() => DealNFT, { nullable: true })
  // nftDetails?: DealNFT;

  // @Field(() => [DealOption], { nullable: 'itemsAndList' })
  // options?: DealOption[];

  // @Field(() => [String], { nullable: 'itemsAndList' })
  // tags?: string[];

  // @Field(() => [Comment], { nullable: 'itemsAndList' })
  // comments?: Comment[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
