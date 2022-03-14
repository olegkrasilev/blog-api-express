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

import { User } from './User';

import { Comments } from './Comment';

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

  @ManyToOne(() => User, (user: User) => user.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comments, (comments: Comments) => comments.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  comments: Comments[];
}
