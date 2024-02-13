class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(`[${this.name}] ${message}`);
  }

  info(message) {
    this.log(`info: ${message}`);
  }

  verbose(message) {
    this.log(`verbose: ${message}`);
  }
}

/**
 * With this pattern we allow the user to create new instances using the constructor,
 * but we also give them the ability to extend its prototype and reproduce new classes.
 */
//  
module.exports = Logger;
