import { createConnection } from 'typeorm';

import { Posts } from '@src/models/entities/Post';
import { User } from '@src/models/entities/User';
import { config } from '@src/config/config';
import { Comments } from '@src/models/entities/Comment';

const { host, database, password, port, username } = config.db;

export const connectDB = async () =>
  createConnection({
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database,
    entities: [User, Posts, Comments],
    synchronize: true,
  })
    .then(result => {
      console.log('DB is connected');

      return result;
    })
    .catch(error => {
      console.error(error);
      throw new Error('Unable to connect to DB');
    });
