import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';
import { DealEntity } from './deal.entity';
import { TagEntity } from './tag.entity';

@Entity('merchant')
export class MerchantEntity extends AbstractEntity {
  constructor(data?: Partial<MerchantEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_merchant_id' })
  id!: number;

  @Column()
  @Index('UQ_merchant_slug', ['slug'], { unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  externalId?: string; // ID from Booking, Shopify, etc.

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

  /** Relationships **/

  // A merchant can have multiple deals (products, hotel offers, etc.)
  @OneToMany(() => DealEntity, (deal) => deal.merchant)
  deals!: Relation<DealEntity[]>;

  // Tags for merchant classification (e.g., "travel", "retail", "fashion")
  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'merchant_to_tag',
    joinColumn: {
      name: 'merchant_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_merchant_to_tag_merchant',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_merchant_to_tag_tag',
    },
  })
  tags!: Relation<TagEntity[]>;

  // Comments or reviews for merchant
  @OneToMany(() => CommentEntity, (comment) => comment.merchant)
  comments!: Relation<CommentEntity[]>;
}
