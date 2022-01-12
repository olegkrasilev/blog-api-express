import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Comments } from '@src/models/entities/Comment';
import { Posts } from '@src/models/entities/Post';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  encryptedPassword: string;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @OneToMany(() => Posts, (posts: Posts) => posts.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts: Posts[];

  @OneToMany(() => Comments, (comments: Comments) => comments.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  comments: Comments[];
}
