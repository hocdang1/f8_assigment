import { ErrorRequestHandler, RequestHandler } from 'express';
import createError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'sequelize';

import config from '../config';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
    next(createError(StatusCodes.NOT_FOUND));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let status = err instanceof HttpError ? err.status : 500;
    let message = (err as Error).message || (err as Error).name;

    if (err instanceof ValidationError) {
        status = 400;
        message = err.errors.map((e) => e.message).join(', ');
    }

    res.status(status).json({
        success: false,
        message,
        ...(config.environment === 'development' && { stack: err.stack }),
    });
};
