import { ErrorCode } from '@/constants/error-code.constant';
// import { ValidationException } from '@monkedeals/graphql';
import { DealEntity } from '@monkedeals/postgresql-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UpdateUserInput } from './dto/deal.dto';
import { ValidationException } from '@monkedeals/graphql/exceptions/validation.exception';
import { Deal } from './model/deal.model';
@Injectable()
export class DealService {
  private readonly logger = new Logger(DealService.name);

  constructor(
    @InjectRepository(DealEntity)
    private readonly dealRepository: Repository<DealEntity>,
  ) {}

  async get(id: number): Promise<Deal> {
    const deal = await this.dealRepository.findOneByOrFail({
      id,
    });
    if (!deal) {
      throw new ValidationException(ErrorCode.E003, 'Deal not found');
    }
    return { ...deal, category: deal.category };
  }

  async getDealByCategory(category: string): Promise<Deal[]> {
    const deals = await this.dealRepository.find({
      where: { category },
    });

    return deals;
  }
}
