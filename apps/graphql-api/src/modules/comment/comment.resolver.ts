import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './model/comment.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment], {
    name: 'getDealComments',
    description: 'Get all comments for a deal by deal ID',
  })
  async getDealComments(@Args('dealId') dealId: number): Promise<Comment[]> {
    return this.commentService.getDealCommeents(dealId);
  }

  @Query(() => [Comment], {
    name: 'getMerchantComments',
    description: 'Get all comments for a merchant by merchant ID',
  })
  async getMerchantComments(
    @Args('merchantId') merchantId: number,
  ): Promise<Comment[]> {
    return this.commentService.getMerchantsCommeents(merchantId);
  }
}
