const Logger = require("./logger.js");

const dbLogger = new Logger("DB");
const accessLogger = new Logger("ACCESS");
dbLogger.info("This is an informational message");
accessLogger.verbose("This is a verbose message");
