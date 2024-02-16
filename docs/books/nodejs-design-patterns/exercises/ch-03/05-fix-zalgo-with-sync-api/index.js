import { readFileSync } from 'fs';

// The preceding function uses the cache map to store the results of different file read operations.
const cache = new Map();
/**
 * The function is dangerous because it behaves asynchronously until the file is read for the first time and the cache is set,
 * it completely synchronous.
 * @param {*} filename
 * @param {*} callback
 */
function consistentReadSync(filename) {
  if (cache.has(filename)) {
    return cache.get(filename);
  } else {
    const data = readFileSync(filename, 'utf8'); // synchronous I/O operations.
    cache.set(filename, data);
    return data;
  }
}

console.log(consistentReadSync('data.txt'));
// the next call will read from the cache
console.log(consistentReadSync('data.txt'));
