const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const prometheus = require('express-prom-bundle');

// Routes
const tasks = require('./routes/v1');
// Error
const globalErrorHandler = require('./services/error-handler');
const ErrorResponse = require('./utils/error-response');
// Middlewares
const logger = require('./middlewares/logger');

const app = express();

// Service
app.use(express.json());

// logger
app.use(logger);

// Sanitize request data
app.use(xss());
app.use(mongoSanitize());

// Compress all responses
app.use(compression());

// Task API
app.use('/api/v1', tasks);

// while card

app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler.
app.use(globalErrorHandler);

module.exports = app;
