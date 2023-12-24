const path = require('path');
const app = require('./app');
const { dbInit } = require('./db');
const { createBaseConfig } = require('./validation/base');
const logger = require('./config/logger');

async function run() {
  // input base env
  const configBasePath = path.join(__dirname, '../.env');
  // Base Environment config validation.
  const config = createBaseConfig(configBasePath);
  console.log(config);
  // Logger Initialization
  logger.initLogs(config);
  // Database Initialization
  await dbInit(config);

  // creates a HTTP server, and the listen on port ... 
  const server = app.listen(config.port, () => {
    logger.info('app started', { port: config.port });
  });

  // server exit handler. 
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error) => {
    logger.error('unhandled error', { error });
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

run();
