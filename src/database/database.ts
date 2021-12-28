import { User } from '@src/models/entities/User';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () =>
  createConnection({
    type: 'postgres',
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User],
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
