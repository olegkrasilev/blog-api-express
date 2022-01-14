import { Comments } from '@src/models/entities/Comment';

/**
 * @description Find comment in database by userID,postID and commentID
 * @param  {number} userID
 * @param  {number} postID
 * @param  {number} commentID
 */
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
