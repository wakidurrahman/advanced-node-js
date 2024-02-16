import { readFile } from 'fs';

// The preceding function uses the cache map to store the results of different file read operations.
const cache = new Map();
/**
 * The function is dangerous because it behaves asynchronously until the file is read for the first time and the cache is set,
 * but it is synchronous for all the subsequent requests once the file's content is already in the cache.
 * @param {*} filename
 * @param {*} callback
 */
function inconsistentRead(filename, callback) {
  if (cache.has(filename)) {
    console.log('If cache has ---');
    // Invoked synchronously
    callback(cache.get(filename));
    console.log('If cache has --- end');
  } else {
    console.log('else cache no cash ---');
    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data);
      callback(data);
    });
    console.log('else no cache --- end');
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
