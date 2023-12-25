# Asynchronous Work

## 2.1. Asynchronous flow control

At its core, JavaScript is designed to be non-blocking on the ` "main" ``thread `, this is where views are rendered.

This creates some unique constraints that only a functional style of programming can cure. This is where callbacks come in to the picture.

However, callbacks can become challenging to handle in more complicated procedures.

This often results in `"callback hell"` where multiple nested functions with callbacks make the code more challenging to read, debug, organize, etc.

```js
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // do something with output
        });
      });
    });
  });
});
```

Of course, in real life there would most likely be additional lines of code to handle `result1`, `result2`, etc., thus, the length and complexity of this issue usually results in code that looks much more messy than the example above.

**_This is where functions come in to great use. More complex operations are made up of many functions:_**

1. initiator style / input
2. middleware
3. terminator

The `'initiator style/input'` is the first function in the sequence. This function will accept the original `input`, if any, for the `operation`. The operation is an executable series fo functions, and the original input will primarily be:

1. Variables in a global environment
2. Direct invocation with or without arguments
3. Values obtained by file system or network requests.

Network requests can be incoming requests initiated by a foreign networks, by another application on the same network, or by the app itself on the same or foreign network.

A middleware function will return another function, and a terminator function will invoke the callback. The following illustrates the flow to network or file system requests. Here the latency is 0 because all these values are available in memory.

```js
// 3. terminator
function final(inputValue, callback) {
  callback(`${inputValue} and terminated by executing callback`);
}
// 2. middleware
function middleware(inputValue, callback) {
  return final(`${inputValue} touched by middleware`, callback);
}
// 1. initiator style / input

function initiate() {
  // Variable in a global environment
  const someInput = "hello this is a function ";
  middleware(someInput, function (result) {
    console.log(result);
    // requires callback to 'return' result
  });
}

initiate();
```

### State management