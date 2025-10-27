import { Public } from '@monkedeals/nest-common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Public()
  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }
}
