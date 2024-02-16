// a simple synchronous function

function add(a, b) {
  return a + b;
}
const addWithArrowFunction = (a, b) => a + b;

// continuation-passing style
/**
 * The function is a asynchronous: CPS function.
 *
 * we used setTimeout() to simulate an asynchronous invocation of the callback.
 * @param {*} a
 * @param {*} b
 * @param {*} callback
 */
function addAsyncContinuationPassingStyle(a, b, callback) {
  // setTimeout() adds a task to the `event queue` that is executed after the given number of milliseconds.
  setTimeout(() => callback(a + b), 1000);
}

console.log('------- Before function call -----------');
addAsyncContinuationPassingStyle(23, 30, (result) =>
  console.log(`Result of the callback: ${result}`)
);
console.log('------- After function call -----------');
