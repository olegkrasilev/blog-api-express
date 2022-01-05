import { Response, NextFunction, Request } from 'express';
import { getManager } from 'typeorm';

import { User } from '@src/models/entities/User';

export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  const entityManager = getManager();
  const { id } = request.body;
  // TODO add validation
  const [user] = await User.findByIds([id]);

  await entityManager.delete(User, id);

  return response.status(204).json({
    status: 'success',
    data: undefined,
  });
};
