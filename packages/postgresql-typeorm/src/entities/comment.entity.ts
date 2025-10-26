import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DealEntity } from './deal.entity';
import { MerchantEntity } from './merchant.entity';
import { UserEntity } from './user.entity';

@Entity('comment')
export class CommentEntity extends AbstractEntity {
  constructor(data?: Partial<CommentEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_comment_id' })
  id!: number;

  @Column('text')
  body!: string;

  @Column({ type: 'int', default: 0 })
  rating!: number; // optional 1–5 score, useful for reviews

  /** Author Relationship **/
  @Column({ name: 'author_id' })
  authorId!: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_comment_user',
  })
  author!: Relation<UserEntity>;

  /** Deal Relationship (optional) **/
  @Column({ name: 'deal_id', nullable: true })
  dealId?: number;

  @ManyToOne(() => DealEntity, (deal) => deal.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'deal_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_comment_deal',
  })
  deal?: Relation<DealEntity>;

  /** Merchant Relationship (optional) **/
  @Column({ name: 'merchant_id', nullable: true })
  merchantId?: number;

  @ManyToOne(() => MerchantEntity, (merchant) => merchant.comments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'merchant_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_comment_merchant',
  })
  merchant?: Relation<MerchantEntity>;

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
