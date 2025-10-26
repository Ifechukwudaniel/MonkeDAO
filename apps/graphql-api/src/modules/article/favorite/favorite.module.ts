import { ArticleEntity, UserEntity } from '@monkedeals/postgresql-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteResolver } from './favorite.resolver';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
