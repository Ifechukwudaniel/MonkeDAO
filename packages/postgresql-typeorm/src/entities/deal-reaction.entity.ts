import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';
import { DealEntity } from './deal.entity';
import { UserEntity } from './user.entity';

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

@Entity('deal_reaction')
@Index('UQ_deal_user_comment', ['dealId', 'userId', 'commentId'], {
  unique: true,
})
export class DealReactionEntity extends AbstractEntity {
  constructor(data?: Partial<DealReactionEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_deal_reaction_id' })
  id!: number;

  // Foreign key columns
  @Column({ name: 'deal_id' })
  dealId!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'comment_id', nullable: true })
  commentId?: number;

  // Relations
  @ManyToOne(() => DealEntity, (deal) => deal.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'deal_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_reaction_deal_id',
  })
  deal!: DealEntity;

  @ManyToOne(() => UserEntity, (user) => user.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_reaction_user_id',
  })
  user!: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.reactions, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'comment_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_deal_reaction_comment_id',
  })
  comment?: CommentEntity;

  @Column({ type: 'enum', enum: ReactionType })
  type!: ReactionType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt!: Date;
}
