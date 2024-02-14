/**
 * When we use this type of import statement, the entities are imported into the current scope,
 * so there is a risk of a name clash.
 */
// name clash
import { log } from './logger.js';
// const log = console.log

// const log = console.log
// ^

// SyntaxError: Identifier 'log' has already been declared

// const log = console.log // <- this would generate a "SyntaxError: Identifier 'log' has already been declared" error
log('Hello world');
