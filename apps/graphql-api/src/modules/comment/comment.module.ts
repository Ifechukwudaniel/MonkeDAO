import {
  CommentEntity,
  DealEntity,
  MerchantEntity,
} from '@monkedeals/postgresql-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, DealEntity, MerchantEntity]),
    AuthModule,
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
