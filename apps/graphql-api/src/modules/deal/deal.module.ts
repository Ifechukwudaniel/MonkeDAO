import { DealEntity, DealOptionEntity } from '@monkedeals/postgresql-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealResolver } from './deal.resolver';
import { DealService } from './deal.service';
@Module({
  imports: [TypeOrmModule.forFeature([DealEntity, DealOptionEntity])],
  providers: [DealResolver, DealService],
})
export class DealModule {}
