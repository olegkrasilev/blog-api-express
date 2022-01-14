import { Comments } from '@src/models/entities/Comment';

export const findComment = async (userID: number, postID: number, commentID: number) =>
  Comments.findOne(commentID, {
    relations: ['user', 'post'],
    where: {
      user: {
        id: userID,
      },
      post: {
        id: postID,
      },
    },
  });
