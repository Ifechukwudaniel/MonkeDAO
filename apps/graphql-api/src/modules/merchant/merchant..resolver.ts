import { Args, Query, Resolver } from '@nestjs/graphql';
import { MerchantService } from './merchant.service';
import { Merchant } from './model/merchant.model';

@Resolver(() => Merchant)
export class MerchantResolver {
  constructor(
    private readonly merchantService: MerchantService,
    // private readonly authService: AuthService,
  ) {}

  @Query(() => Merchant, {
    name: 'getMerchant',
    description: 'Get merchant by ID',
  })
  async getMerchant(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<Merchant> {
    return this.merchantService.get(id);
  }
}
