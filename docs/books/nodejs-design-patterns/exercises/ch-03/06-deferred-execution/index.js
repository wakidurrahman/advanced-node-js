import { readFile } from 'fs';

// The preceding function uses the cache map to store the results of different file read operations.
const cache = new Map();
/**
 * The function to make it purely asynchronous.
 *
 * The trick here is to schedule the synchronous callback  invocation to be executed "in the future" instead of it being run immediately in the same event loop cycle.
 * @param {*} filename
 * @param {*} callback
 */
function inconsistentRead(filename, callback) {
  if (cache.has(filename)) {
    /**
     * with process.nextTick(), 
     * which defers the execution of a function after the currently running operation completes.
     * 
     * It takes a callback as an argument and pushes it to the top of the event queue, 
     * in front of any pending I/O event, and returns immediately.
     */
    // deferred callback invocation
    process.nextTick(() => callback(cache.get(filename))); // our function is guaranteed to invoke its `callback` asynchronously, under any circumstances.
  } else {
    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data);
      callback(data);
    });
  }
}

/**
 * it creates a new object that acts as a notifier, allowing us to set multiple listeners for a file read operation.
 *
 * All the listeners will be invoked at once when the read operation completes and the data is available.
 *
 * The function uses our inconsistentRead() function to implement this functionality.
 * @param {*} filename
 * @returns
 */
function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => {
      listener(value);
    });
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const readerOne = createFileReader('data.txt');

readerOne.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  // ...sometime letter we try to read again from this file
  const readerTwo = createFileReader('data.txt');
  readerTwo.onDataReady((data) => console.log(`Second call data: ${data}`));
  // ...sometime letter we try to read again from this file
  const readerThree = createFileReader('data.txt');
  readerThree.onDataReady((data) => console.log(`Third call data: ${data}`));
});
