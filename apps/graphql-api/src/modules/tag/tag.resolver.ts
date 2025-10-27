import { Public } from '@monkedeals/nest-common';
import { Query, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Query(() => [String], { name: 'tags' })
  list(): Promise<string[]> {
    return this.tagService.list();
  }
}
