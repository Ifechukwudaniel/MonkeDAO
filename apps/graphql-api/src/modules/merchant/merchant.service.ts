import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@monkedeals/graphql';
import { MerchantEntity } from '@monkedeals/postgresql-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './model/merchant.model';
@Injectable()
export class MerchantService {
  private readonly logger = new Logger(MerchantService.name);

  constructor(
    @InjectRepository(MerchantEntity)
    private readonly merchantRepository: Repository<MerchantEntity>,
  ) {}

  async get(id: number): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOneByOrFail({
      id,
    });

    if (!merchant) {
      throw new ValidationException(ErrorCode.E003, 'Merchant not found');
    }

    return { ...merchant };
  }
}
