import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { router as userRouter } from '@src/routes/userRouter';

export const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'fail',
    data: `Can't find ${request.url} on this website`,
  });
});
