import { count, increment } from './counter.js';

// we can read the value of count at any time
console.log(count);

// change it using the increment() function,
increment();
console.log(count);
increment();
console.log(count);
increment();
console.log(count);
increment();
console.log(count);

/**
 * as soon as we try to mutate the count variable directly,  we get an error as if we were trying to mutate a const binding.
 */
// count++; // TypeError: Assignment to constant variable!
