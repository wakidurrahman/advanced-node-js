/**
 * we can resolve the clash by renaming the imported entity with the as keyword.
 * 
 * This approach can be particularly useful when the clash is generated 
 * by importing two entities with the same name from different modules,
 * 
 * therefore changing the original names is outside the consumer's control.
 */

import { log as log2 } from './logger.js'
const log = console.log

log('message from log')
log2('message from log2')

