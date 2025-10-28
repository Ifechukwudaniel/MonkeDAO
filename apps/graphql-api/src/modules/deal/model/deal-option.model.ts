import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Deal } from './deal.model';

@ObjectType()
export class DealOption {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field(() => Float)
  originalPrice!: number;

  @Field(() => Float)
  discountedPrice!: number;

  @Field()
  available!: boolean;

  @Field(() => Int, { nullable: true })
  maxGuests?: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  includes?: string[];

  /** Relation to Deal */
  @Field(() => Deal)
  deal!: Deal;
}
