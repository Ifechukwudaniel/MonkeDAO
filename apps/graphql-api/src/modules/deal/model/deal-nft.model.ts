import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Deal } from './deal.model';

@ObjectType()
export class DealNFT {
  @Field(() => ID)
  id!: number;

  @Field()
  mintable!: boolean;

  @Field()
  tokenStandard!: string; // e.g., 'ERC-1155'

  @Field(() => Float, { nullable: true })
  royaltyPercentage?: number;

  @Field()
  transferable!: boolean;

  @Field(() => Int)
  maxSupply!: number;

  @Field(() => Int)
  currentMinted!: number;

  /** Relation to Deal */
  @Field(() => Deal)
  deal!: Deal;
}
