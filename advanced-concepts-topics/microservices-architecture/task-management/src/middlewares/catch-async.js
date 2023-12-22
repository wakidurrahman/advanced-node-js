// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
/**
 * Applying some DRY
 * One thing we can do to avoid repeating the try/catch
 * code on each async middleware is write once in a high-order function.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * The asyncHandler receives a function and returns a function with three input params
 * (oh wait!!! that's like a middleware function).
 * This new function is responsible to executes the original function passing the three params and catching any error.
 */
module.exports = asyncHandler;