import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DealEntity } from './deal.entity';

@Entity('deal_option')
export class DealOptionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_deal_option_id' })
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'float' })
  originalPrice!: number;

  @Column({ type: 'float' })
  discountedPrice!: number;

  @Column({ default: true })
  available!: boolean;

  @Column({ type: 'int', nullable: true })
  maxGuests?: number;

  @Column({ type: 'jsonb', nullable: true })
  includes?: string[]; // For extra details like amenities or meals

  @ManyToOne(() => DealEntity, (deal) => deal.options, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'deal_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_option_deal',
  })
  deal!: Relation<DealEntity>;
}
