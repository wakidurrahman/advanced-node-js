import * as loggerModule from './logger.js';

/**
 * Internally, a default export is equivalent to a named export with default as the name.
 */
console.log(loggerModule);

const logger = new loggerModule.default("namespace import")
logger.log("Hello World!")