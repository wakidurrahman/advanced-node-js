// Execute a listener when a response is about to write headers.
const onHeaders = require('on-headers');
const logger = require('../config/logger');

// Logging Middleware..

function loggerMiddleware(req, res, next) {
  // Response start time.
  const startedTime = new Date();
  // Convert time formet 
  function msToTime(duration) {
    let milliseconds = parseInt(duration % 1000).toFixed(0);
    let seconds = parseInt((duration / 1000) % 60).toFixed(0);
    let minutes = parseInt((duration / (1000 * 60)) % 60).toFixed(0);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24).toFixed(0);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Format HH:MM:SS.Millisecond
    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }

  logger.debug('request received', {
    url: req.url,
    method: req.method,
    body: req.body,
  });

  // `loggerListener` to fire when headers are emitted for res
  function loggerListener() {
    logger.info('response sent', {
      url: req.url,
      method: req.method,
      statusCode: res.statusCode,
      duration: msToTime(
        new Date().getMilliseconds() - startedTime.getMilliseconds()
      ),
    });
  }
  /**
   * onHeaders(res, listener)
   * This will add the listener `listener` to fire when headers are emitted for res.
   * The listener is passed the response object as it's context (this).
   * Headers are considered to be emitted only once, right before they are sent to the client.
   */

  onHeaders(res, loggerListener);
  // Execute next
  next();
}

module.exports = loggerMiddleware;
