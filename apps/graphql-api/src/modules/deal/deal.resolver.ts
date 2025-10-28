import { Public } from '@monkedeals/nest-common';
import { Args, Query, Resolver } from '@nestjs/graphql';
//import { AuthService } from '../auth/auth.service';
import { DealService } from './deal.service';
import { Deal } from './model/deal.model';

@Resolver(() => Deal)
export class DealResolver {
  constructor(
    //private readonly userService: UserService,
    //private readonly authService: AuthService,
    private readonly dealService: DealService,
  ) {}

  @Public()
  @Query(() => Deal, {
    name: 'getDeal',
    description: 'Get Deal by Id',
  })
  async getDeal(@Args('id') id: number): Promise<Deal> {
    return this.dealService.get(id);
  }

  @Public()
  @Query(() => [Deal], {
    name: 'getDealsByCategory',
    description: 'Get all deals under a specific category',
  })
  async getDealsByCategory(
    @Args('category') category: string,
  ): Promise<Deal[]> {
    return this.dealService.getDealByCategory(category);
  }
}
