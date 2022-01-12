import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Posts } from '@src/models/entities/Post';

import { User } from '@src/models/entities/User';

@Entity('comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  postCreationTime: Date;

  @ManyToOne(() => User, (user: User) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Posts, (post: Posts) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Posts;
}
