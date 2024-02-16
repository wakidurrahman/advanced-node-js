/**
 * The `map()` method of an Array object.
 * 
 * Clearly, the callback is used just to iterate over the elements of the array,
 * and not to pass the result of the operation.
 * In fact, the result is returned synchronously using a direct style.
 * 
 */
const result = [1, 5, 7].map(element => element - 1)
console.log(result) // [0, 4, 6]