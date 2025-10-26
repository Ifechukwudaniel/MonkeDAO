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

@Entity('deal_nft')
export class DealNFTEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_deal_nft_id' })
  id!: number;

  @Column({ default: false })
  mintable!: boolean;

  @Column()
  tokenStandard!: string; // e.g., 'ERC-1155'

  @Column({ type: 'float', nullable: true })
  royaltyPercentage?: number;

  @Column({ default: true })
  transferable!: boolean;

  @Column({ type: 'int' })
  maxSupply!: number;

  @Column({ type: 'int' })
  currentMinted!: number;

  @OneToOne(() => DealEntity, (deal) => deal.nftDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'deal_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_nft_deal',
  })
  deal!: Relation<DealEntity>;
}
