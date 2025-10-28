import {
  CommentEntity,
  DealEntity,
  MerchantEntity,
} from '@monkedeals/postgresql-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './model/comment.model';
@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    // private readonly authService: AuthService,
    @InjectRepository(DealEntity)
    private readonly dealRepository: Repository<DealEntity>,

    @InjectRepository(MerchantEntity)
    private readonly merchantRepository: Repository<MerchantEntity>,

    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async getDealCommeents(dealId: number): Promise<Comment[]> {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId },
    });

    if (!deal) {
      this.logger.warn(`Deal with ID ${dealId} not found`);
      return [];
    }

    const comments = await this.commentRepository.find({
      where: { dealId: deal.id },
    });
    return comments;
  }

  async getMerchantsCommeents(merchantId: number): Promise<Comment[]> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      this.logger.warn(`Merchant with ID ${merchantId} not found`);
      return [];
    }

    const comments = await this.commentRepository.find({
      where: { merchantId: merchant.id },
    });
    return comments;
  }
}
