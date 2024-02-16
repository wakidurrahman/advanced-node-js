// a simple synchronous function

function add(a, b) {
  return a + b;
}
const addWithArrowFunction = (a, b) => a + b;

// continuation-passing style
/**
 * The function is a synchronous CPS function.
 *
 * It's synchronous because it will complete its execution only when the callback completes its execution too.
 * @param {*} a
 * @param {*} b
 * @param {*} callback
 */
function addContinuationPassingStyle(a, b, callback) {
  callback(a + b);
}

console.log('------- Before function call -----------');
addContinuationPassingStyle(23, 30, (result) =>
  console.log(`Result of the callback: ${result}`)
);
console.log('------- After function call -----------');
