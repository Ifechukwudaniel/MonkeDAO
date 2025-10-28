import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { DealModule } from './deal/deal.module';
import { MerchantModule } from './merchant/merchant..module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TagModule,
    DealModule,
    MerchantModule,
    CommentModule,
  ],
})
export class ApiModule {}
