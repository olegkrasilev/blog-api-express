import { app } from '@src/app';
import dotenv from 'dotenv';
import { connectDB } from '@src/database/database';
import { port } from '@src/constants';

dotenv.config();

process.on('uncaughtException', error => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
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
