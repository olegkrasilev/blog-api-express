import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Comments } from '@src/models/entities/Comment';
import { User } from '@src/models/entities/User';

@Entity('posts')
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  post: string;

  @CreateDateColumn()
  postCreationTime: Date;

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comments, (comments: Comments) => comments.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  comments: Comments[];
}
