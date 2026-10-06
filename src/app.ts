import createError, { HttpError } from 'http-errors';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import logger from 'morgan';
import type { ValidationError } from 'sequelize';

import routes from './routes';
import config from './config';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
const notFound: RequestHandler = (_req, _res, next) => {
    next(createError(404));
};
app.use(notFound);

// error handler: luôn trả về JSON
const errorHandler: ErrorRequestHandler = (err: HttpError | ValidationError, _req, res, _next) => {
    // dữ liệu nhập sai (validate của Sequelize) là lỗi 400, không phải 500
    const status = err.name === 'SequelizeValidationError' ? 400 : (err as HttpError).status || 500;
    const message =
        err.name === 'SequelizeValidationError'
            ? (err as ValidationError).errors.map((e) => e.message).join(', ')
            : err.message;

    res.status(status).json({
        success: false,
        message: message || err.name,
        ...(config.environment === 'development' && { stack: err.stack }),
    });
};
app.use(errorHandler);

export default app;
