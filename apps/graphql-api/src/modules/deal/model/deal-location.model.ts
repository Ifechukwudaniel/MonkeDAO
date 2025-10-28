import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Deal } from './deal.model';

@ObjectType()
export class DealLocation {
  @Field(() => ID)
  id!: number;

  @Field()
  address!: string;

  @Field()
  city!: string;

  @Field()
  state!: string;

  @Field()
  country!: string;

  @Field(() => Float)
  lat!: number;

  @Field(() => Float)
  lng!: number;

  @Field(() => Float, { nullable: true })
  distanceFromCenter?: number;

  /** Relation to Deal */
  @Field(() => Deal)
  deal!: Deal;
}
