import express from 'express';
import logger from 'morgan';

import {
    errorHandler,
    notFoundHandler,
} from './middlewares/error-handler.middleware';
import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
