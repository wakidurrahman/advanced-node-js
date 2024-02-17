# 💁‍♂️ Callbacks and Events

🔄 🔁 ♾️ **_Synchronous Programming:_** we conceptualize code as a series of consecutive/sequent computing steps that solve a specific problem. আমরা কোডকে ধারাবাহিক কম্পিউটিং ধাপের একটি সিরিজ হিসাবে ধারণা করি যা একটি নির্দিষ্ট সমস্যার সমাধান করে। Every operation is blocking, which means that only when an operation is completed, it is possible to execute the next one. This approach makes the code very easy to read, understand, and debug.

🔁 🅰️ 🇦 🔄 **_Asynchronous Programming:_** some operations, such as reading from a `file` or performing a `network` request, are launched and then executed "in the background."

**_The callback:_**, which is nothing more than a function invoked by `the runtime` with the result of an asynchronous operation.

## #️⃣ The Callback pattern

**Callbacks**: are functions that are invoked to propagate the result of an operation.

JavaScript is the ideal language for `callbacks` because functions are **_first-class_** objects and can be easily.

- function assigned to variables,
- function passed as arguments,
- function returned from another function invocation,
- function stored in data structures,

Another ideal construct for implementing callbacks is `closures`.

### 📝 The continuation-passing style

In JavaScript, a callback is a function that is passed as an argument to another function and is invoked with the result when the operation completes.(JavaScript মধ্যে, একটি callback একটি function যা অন্য ফাংশনে একটি argument হিসাবে পাস করা হয় এবং যখন অপারেশন সম্পূর্ণ হয় তখন ফলাফলের সাথে আহ্বান করা হয়।)

> [!NOTE]
> In functional programming, this way of propagating the result is called continuation-passing style (CPS).

### 📝 Synchronous continuation-passing style (CPS).

```js
function addCps(a, b, callback) {
  callback(a + b);
}

addCps(1, 2, (result) => console.log(`Result: ${result}`));
```

### 📝 Asynchronous continuation-passing style (CPS).

we used setTimeout() to simulate an asynchronous invocation of the callback.
`setTimeout()` adds a task to the event queue that is executed after the given number of milliseconds.

```js
function addAsyncCps(a, b, callback) {
  setTimeout(() => callback(a + b), 100);
}

additionAsync(1, 2, (result) => console.log(`Result: ${result}`));
```

Since `setTimeout()` triggers an asynchronous operation, it doesn't wait for the callback to be executed; instead, it returns immediately, giving the control back to addAsyncCps(), and then back again to its caller.

### 📝 Non-CPS callbacks

```js
const result = [1, 5, 7].map((element) => element - 1);
console.log(result); // [0, 4, 6]
```

The callback is used just to iterate over the elements of the array, and not to pass the result of the operation. In fact, the result is returned synchronously using a **_direct style_**.

## #️⃣ Synchronous or asynchronous?

### 📝 An unpredictable function

### 📝 Unleashing Zalgo

### 📝 Using synchronous APIs

using a synchronous API instead of an asynchronous one has some caveats:

- A synchronous API for a specific functionality might not always be available.
- A synchronous API will block the event loop and put any concurrent requests on hold.
- A synchronous API will break the Node.js concurrency model, slowing down the whole application.

The risk of blocking the event loop is partially mitigated because the synchronous I/O API is invoked only once per filename, while

Using synchronous I/O in Node.js is strongly discouraged in many circumstances

> [!TIP]
> It makes perfect sense to use a synchronous blocking API to load a configuration file while bootstrapping an application.

### 📝 Guaranteeing asynchronicity with deferred execution

In Node.js, with process.nextTick(), which defers the execution of a function after the currently running operation completes. Its functionality is very simple: it takes a `callback` as an argument and pushes it to the top 🔝 of the `event queue`, in front of any pending `I/O` event, and returns immediately. The `callback` will then be invoked as soon as the currently running operation yields control back to the `event loop`.

```js
process.nextTick(() => callback(cache.get(filename)));
```

## #️⃣ Node.js callback conventions

In Node.js, CPS APIs and callbacks follow a set of specific conventions. These conventions apply to the Node.js core API, but they are also followed by the vast majority of the userland modules and applications.

### 📝 The callback comes last

In all core Node.js functions, the standard convention is that when a function accepts a `callback` as input, this has to be passed as the **last argument**.

Let's take the following Node.js core API as an example:

```js
readFile(filename, [options], callback);
```

The reason for this convention is that the function call is more readable in case the `callback` is defined in place.

### 📝 Any error always comes first

```js
readFile('foo.txt', 'utf8', (err, data) => {
  // ..
});
```

### 📝 Propagating errors

**In synchronous:**, `direct style` functions error propagation is done with the well-known `throw` statement, which causes the `error` to jump up in the call stack until it is taken.

**In asynchronous:** `CPS`, however, proper error propagation is done by simply passing the `error` to the `next` `callback` in the chain.

### 📝 Uncaught exceptions

Sometimes, it can happen that an `error` is thrown and not caught within the `callback` of an `asynchronous` function.

```js
readFile(filename, 'utf8', (err, data) => {
  // the callback of an asynchronous function
  try {
    // parse the file contents
    parsed = JSON.parse(data);
  } catch (err) {
    // catch parsing errors
    console.error(err);
  }
});
```

This could happen if, for example, we had forgotten to surround `JSON.parse()` with a `try...catch` statement in the `readJSON()` function.

Throwing an `error` inside an `asynchronous` `callback` would cause the `error` to jump up to the `event loop`, so it would never be propagated to the next callback.(একটি অ্যাসিঙ্ক্রোনাস কলব্যাকের ভিতরে একটি ত্রুটি নিক্ষেপ করার ফলে ত্রুটিটি ইভেন্ট লুপে চলে যাবে, তাই এটি পরবর্তী কলব্যাকে কখনই প্রচারিত হবে না।)

> [!CAUTION]
> In Node.js, this is an **_unrecoverable state_** and the application would simply `exit` with a `non-zero exit code`, printing the stack trace to the `stderr` interface.

> [!TIP]
> It is always advised, especially in production, to never leave the application running after an uncaught exception is received.

Instead, the process should exit immediately, optionally after having run some necessary cleanup tasks, and ideally, a supervising process should restart the application. This is also known as the **fail-fast** approach and it's the recommended practice in Node.js. (পরিবর্তে, প্রক্রিয়াটি অবিলম্বে প্রস্থান করা উচিত, ঐচ্ছিকভাবে কিছু প্রয়োজনীয় ক্লিনআপ কাজ চালানোর পরে, এবং আদর্শভাবে, একটি তত্ত্বাবধান প্রক্রিয়া অ্যাপ্লিকেশন পুনরায় চালু করা উচিত। এটি ব্যর্থ-দ্রুত পদ্ধতি হিসাবেও পরিচিত এবং এটি Node.js-এ প্রস্তাবিত অনুশীলন।)

---

## #️⃣ The Observer pattern

The Observer pattern defines an object (called subject) that can notify a set of observers (or listeners) when a change in its state occurs.

### 📝 The EventEmitter

The Observer pattern is already built into the core and is available through the `EventEmitter` class.

The `EventEmitter` class allows us to register one or more functions as listeners, which will be invoked when a particular event type is fired.

The EventEmitter is exported from the events core module.

```js
import { EventEmitter } from 'events';
const emitter = new EventEmitter();
```

The essential methods of the EventEmitter are as follows:


- `on(event, listener)`: This method allows us to register a new listener (a function) for the given event type (a string).
- `once(event, listener)`: This method registers a new listener, which is then removed after the event is emitted for the first time.
- `emit(event, [arg1], [...])`: This method produces a new event and provides additional arguments to be passed to the listeners.
- `removeListener(event, listener)`: This method removes a listener for the specified event type.

### 📝 The EventEmitter Propagating errors

The convention is to emit a special event, called error, and pass an Error object as an argument.