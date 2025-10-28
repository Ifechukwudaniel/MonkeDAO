import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';
import { DealLocationEntity } from './deal-location.entity';
import { DealNFTEntity } from './deal-nft.entity';
import { DealOptionEntity } from './deal-option.entity';
import { MerchantEntity } from './merchant.entity';
import { TagEntity } from './tag.entity';

@Entity('deal')
export class DealEntity extends AbstractEntity {
  constructor(data?: Partial<DealEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_deal_id' })
  id!: number;

  @Column()
  @Index('UQ_deal_slug', ['slug'], { unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  subCategory?: string;

  @Column({ type: 'int', nullable: true })
  originalPrice?: number;

  @Column({ type: 'int', nullable: true })
  discountedPrice?: number;

  @Column({ type: 'float', nullable: true })
  discountPercent?: number;

  @Column({ length: 3, nullable: true })
  currency?: string;

  @Column({ nullable: true })
  externalId?: string; // From Skyscanner, Booking, Shopify, etc.

  @Column({ nullable: true })
  externalUrl?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: true })
  active!: boolean;

  @Column({ name: 'source', length: 50 })
  source!: string; // e.g. 'skyscanner', 'booking', 'shopify', 'groupon'

  @ManyToOne(() => MerchantEntity, (merchant) => merchant.deals, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'merchant_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_merchant',
  })
  merchant!: Relation<MerchantEntity>;

  @OneToOne(() => DealLocationEntity, (location) => location.deal, {
    cascade: true,
  })
  location!: Relation<DealLocationEntity>;

  @OneToOne(() => DealNFTEntity, (nftDetails) => nftDetails.deal, {
    cascade: true,
  })
  nftDetails!: Relation<DealNFTEntity>;

  @OneToMany(() => DealOptionEntity, (option) => option.deal, {
    cascade: true,
  })
  options!: Relation<DealOptionEntity[]>;

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'deal_to_tag',
    joinColumn: {
      name: 'deal_id',
      foreignKeyConstraintName: 'FK_deal_to_tag_deal',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      foreignKeyConstraintName: 'FK_deal_to_tag_tag',
      referencedColumnName: 'id',
    },
  })
  tags!: Relation<TagEntity[]>;

  /** FIXED RELATION **/
  @OneToMany(() => CommentEntity, (comment) => comment.deal)
  comments!: Relation<CommentEntity[]>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt!: Date;
}
