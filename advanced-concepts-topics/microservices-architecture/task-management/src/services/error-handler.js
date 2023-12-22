const logger = require('../config/logger');
const ErrorResponse = require('../utils/error-response');
const responseTo = require('../utils/response-to');

const sendErrorDev = (err, res) => {
  logger.error('send error development', { err });
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    logger.error('unhandled error', { err });
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);
    logger.error('unhandled error', { err });

    // 2) Send generic message
    res.status(responseTo.FIVE_HUNDRED).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  
  if (typeof err === 'string') {
    // custom application error
    const error = new ErrorResponse(err.message, responseTo.FOUR_HUNDRED);
    logger.error('custom application error', { error });
    res.status(responseTo.FOUR_HUNDRED).json({
      status: error.status,
      message: error.message,
    });
    // stop further execution in this callback
    return;
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    const message = 'invalid token';
    logger.error('jwt authentication error', message);
    res.status(responseTo.FOUR_HUNDRED_ONE).json({
      status: responseTo.FOUR_HUNDRED_ONE,
      error: message,
    });
    // stop further execution in this callback
    return;
  }
  if (err.isJoi) {
    // customize Joi validation errors
    err.message = err.details.map((e) => e.message).join('; ');
    err.status = responseTo.FOUR_HUNDRED;
    logger.error('customize Joi validation errors', err);
    res.status(responseTo.FOUR_HUNDRED).json({
      status: err.status,
      message: err.message,
    });
    // stop further execution in this callback
    return;
  }
  // Mongoose validation error
  if (err.name === 'ValidationError' && err.errors) {
    console.log("ValidationError")
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    // eslint-disable-next-line prefer-const
    let valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).json({
      status: 422,
      message: valErrors,
    });
    // stop further execution in this callback
    return;
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    console.log("CastError")
    // const message = 'Resource not found';
    const message = `Invalid ${err.path}: ${err.value}.`;
    res.status(responseTo.FOUR_HUNDRED).json({
      status: 'fale',
      message: message,
    });
    // stop further execution in this callback
    return;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    console.log("Duplicate field value")
    // const message = 'Duplicate field value entered';
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value!`;
    res.status(responseTo.FOUR_HUNDRED).json({
      status: 'fail',
      message,
    });
    // stop further execution in this callback
    return;
  }
  if (err.name === 'TokenExpiredError') {
    const message = 'Token Expired Error';
    res.status(responseTo.FIVE_HUNDRED).json({
      status: 'error',
      message,
    });
    // stop further execution in this callback
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'invalid token';
    res.status(responseTo.FIVE_HUNDRED).json({
      status: 'error',
      message,
    });
    // stop further execution in this callback
    return;
  }

  // default to 500 server error

  if (process.env.NODE_ENV === 'development') {
    err.statusCode = err.statusCode || responseTo.FIVE_HUNDRED;
    err.status = err.status || 'error';
    return sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    err.statusCode = err.statusCode || responseTo.FIVE_HUNDRED;
    err.status = err.status || 'error';
    return sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
