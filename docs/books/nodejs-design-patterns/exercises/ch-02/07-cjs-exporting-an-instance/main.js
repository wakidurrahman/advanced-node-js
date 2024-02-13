const logger = require("./logger.js");


logger.log("This is an informational message");
// we can instantiate new Logger objects
const customLogger = new logger.constructor('CUSTOM')
customLogger.log('This is an informational message')
