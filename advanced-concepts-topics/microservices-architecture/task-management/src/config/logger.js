const path = require('path');
// The most popular package to collect JavaScript logs is winston
// https://github.com/winstonjs/winston
const winston = require('winston');

/**
 * Logging
 *
 * Application log stream helps you to ‘remotely debug’ web service.
 * You can simply identify the code execution path and explain the request logic in different circumstances if you cover your code with logs.
 */

// The recommended way to use winston is to create your own logger.
const logger = winston.createLogger({
  // level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'task-management' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
     new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;

function initLogs({ env, logLevel: level }) {
  logger.add(
    new winston.transports.Console({
      level,
      silent: env === 'test',
    })
  );

  if (env !== 'development') {
    logger.add(
      new winston.transports.File({
        level,
        filename: path.join(__dirname, '../../logs/app.log'),
      })
    );
  }
}

function destroyLogs() {
  logger.clear();
  logger.close();
}

module.exports.initLogs = initLogs;
module.exports.destroyLogs = destroyLogs;
