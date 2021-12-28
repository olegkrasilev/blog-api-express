import express from 'express';
import bodyParser from 'body-parser';

export const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
