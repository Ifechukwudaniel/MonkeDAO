import { ErrorCode } from '@/constants/error-code.constant';
// import { ValidationException } from '@monkedeals/graphql';
import {
  DealEntity,
  DealLocationEntity,
  DealOptionEntity,
} from '@monkedeals/postgresql-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UpdateUserInput } from './dto/deal.dto';
import { ValidationException } from '@monkedeals/graphql/exceptions/validation.exception';
import { DealLocation } from './model/deal-location.model';
import { DealOption } from './model/deal-option.model';
import { Deal } from './model/deal.model';
@Injectable()
export class DealService {
  private readonly logger = new Logger(DealService.name);

  constructor(
    @InjectRepository(DealEntity)
    private readonly dealRepository: Repository<DealEntity>,

    @InjectRepository(DealOptionEntity)
    private readonly dealOptionRepository: Repository<DealOptionEntity>,

    @InjectRepository(DealLocationEntity)
    private readonly dealLocationRepository: Repository<DealLocationEntity>,
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

  async getDealOption(id: number): Promise<DealOption[]> {
    await this.ensureDealExists(id);
    const dealOptions = await this.dealOptionRepository
      .createQueryBuilder('option')
      .where('option.deal_id = :dealId', { dealId: id })
      .getMany();

    return dealOptions;
  }

  async getDealLocation(id: number): Promise<DealLocation> {
    await this.ensureDealExists(id);
    const location = await this.dealLocationRepository
      .createQueryBuilder('location')
      .where('location.deal_id = :dealId', { dealId: id })
      .getOne();
    return { ...location };
  }

  private async ensureDealExists(id: number): Promise<void> {
    const deal = await this.dealRepository.findOneByOrFail({
      id,
    });
    if (!deal) {
      throw new ValidationException(ErrorCode.E003, 'Deal not found');
    }
  }
}
