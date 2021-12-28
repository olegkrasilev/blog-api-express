import { createConnection } from 'typeorm';
import { port } from '@src/constants/index';

export const connectDB = async () =>
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5000,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
    .then(result => {
      console.log('DB is connected');

      return result;
    })
    .catch(error => {
      console.error(error);
      throw new Error('Unable to connect to DB');
    });
