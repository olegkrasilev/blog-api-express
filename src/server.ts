import { app } from '@src/app';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { port } from '@src/constants/index';

dotenv.config();

process.on('uncaughtException', error => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const connectDB = async () =>
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

connectDB();

const handleException = (error: Error): void => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
};

process.on('unhandledRejection', handleException);
