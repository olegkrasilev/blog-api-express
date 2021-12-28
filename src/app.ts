import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getAllUsers = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'All users',
  });
};

const getUser = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'User',
  });
};

const updateUser = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'Success',
    // TODO all users length
    data: 'Updated User',
  });
};

app.get('/api/v1/getAllUsers', getAllUsers);
app.get('/api/v1/getUser/:id', getUser);
app.patch('/api/v1/updateUser/:id', updateUser);
