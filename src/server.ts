import express from 'express';
import routes from './routes';
import 'reflect-metadata';

import './database';
import upload from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.get('/', (request, response) => {
    response.json({ message: 'Hello GoStack' });
});

app.listen(3333, () => {
    console.log('✈ Server started on port 3333');
});
