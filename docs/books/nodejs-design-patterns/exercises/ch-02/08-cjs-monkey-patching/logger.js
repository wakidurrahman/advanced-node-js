class Logger {
  constructor(name) {
    this.count = 0;
    this.name = name;
  }

  log(message) {
    this.count += 1;
    console.log(`[${this.name}] ${message}`);
  }
}

/**
 * With this pattern we allow the user to create new instances using the constructor,
 * but we also give them the ability to extend its prototype and reproduce new classes.
 */
//
module.exports = new Logger("DEFAULT");
module.exports.Logger = Logger;
