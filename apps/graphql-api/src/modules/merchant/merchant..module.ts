import { MerchantEntity } from '@monkedeals/postgresql-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MerchantResolver } from './merchant..resolver';
import { MerchantService } from './merchant.service';
@Module({
  imports: [TypeOrmModule.forFeature([MerchantEntity]), AuthModule],
  providers: [MerchantResolver, MerchantService],
})
export class MerchantModule {}
