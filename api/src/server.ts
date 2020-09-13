import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import 'reflect-metadata';

import './database';
import upload from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);
app.use(
    (
        error: AppError,
        request: Request,
        response: Response,
        _next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        console.error(error);
        return response.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    },
);

app.get('/', (request, response) => {
    response.json({ message: 'Hello GoStack' });
});

app.listen(3333, () => {
    console.log('✈ Server started on port 3333');
});
