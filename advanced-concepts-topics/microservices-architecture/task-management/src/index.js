const path = require('path');
const { dbInit, destroy } = require('./db');
const { createBaseConfig } = require('./validation/base');
const app = require('./app');

async function run() {
  const configBasePath = path.join(__dirname, '../.env');
  const config = createBaseConfig(configBasePath);

  await dbInit(config);
  const server = app.listen(config.port, () => {
    console.info('App started', { port: config.port });
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info('server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error) => {
    console.error('unhandled error', error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

run();
