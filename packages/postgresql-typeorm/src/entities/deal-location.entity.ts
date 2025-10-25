import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DealEntity } from './deal.entity';

@Entity('deal_location')
export class DealLocationEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_deal_location_id' })
  id!: number;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @Column({ type: 'float' })
  lat!: number;

  @Column({ type: 'float' })
  lng!: number;

  @Column({ type: 'float', nullable: true })
  distanceFromCenter?: number;

  @OneToOne(() => DealEntity, (deal) => deal.location, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'deal_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_location_deal',
  })
  deal!: Relation<DealEntity>;
}
