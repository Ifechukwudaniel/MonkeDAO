import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CommentEntity } from './comment.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_user_id' })
  id!: number;

  @Column()
  @Index('UQ_user_username', ['username'], { unique: true })
  username!: string;

  @Column()
  @Index('UQ_user_email', ['email'], { unique: true })
  email!: string;

  @Column({ nullable: true })
  walletAddress?: string;

  @Column({ default: '' })
  image!: string;

  @Column({ default: '' })
  bio!: string;

  @OneToMany(() => CommentEntity, (comment) => comment.author)
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
