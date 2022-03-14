import { createConnection } from 'typeorm';

export const connectDB = async () =>
  createConnection()
    .then(connection => {
      console.log('DB is connected');

      return connection;
    })
    .catch(error => {
      console.error(error);
      throw new Error('Unable to connect to DB');
    });
