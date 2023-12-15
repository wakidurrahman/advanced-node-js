# Getting Started

It covers a wide range of topics and is regularly updated.

## 1. Introduction to Node.js

> A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.
> একটি Node.js অ্যাপ প্রতিটি অনুরোধের জন্য একটি নতুন থ্রেড তৈরি না করে একটি একক প্রক্রিয়ায় চলে। Node.js তার স্ট্যান্ডার্ড লাইব্রেরিতে অ্যাসিঙ্ক্রোনাস I/O আদিমগুলির একটি সেট সরবরাহ করে যা জাভাস্ক্রিপ্ট কোডকে ব্লক করা থেকে বাধা দেয় এবং সাধারণত, Node.js-এর লাইব্রেরিগুলি নন-ব্লকিং প্যারাডাইম ব্যবহার করে লেখা হয়, ব্লকিং আচরণকে আদর্শের পরিবর্তে ব্যতিক্রম করে তোলে।

>  When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
যখন Node.js একটি I/O ক্রিয়াকলাপ সম্পাদন করে, যেমন নেটওয়ার্ক থেকে পড়া, একটি ডাটাবেস বা ফাইল সিস্টেম অ্যাক্সেস করা, থ্রেড ব্লক করার পরিবর্তে এবং অপেক্ষায় থাকা CPU চক্র নষ্ট করার পরিবর্তে, প্রতিক্রিয়া ফিরে এলে Node.js অপারেশনগুলি পুনরায় শুরু করবে।

> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.
এটি Node.js-কে থ্রেড কনকারেন্সি পরিচালনার বোঝা প্রবর্তন না করে একটি একক সার্ভারের সাথে হাজার হাজার সমবর্তী সংযোগ পরিচালনা করতে দেয়, যা বাগগুলির একটি উল্লেখযোগ্য উত্স হতে পারে।

```ts
// Importing the http module
import * as http from "http";

// Defining types for hostname and port.
const hostname: string = '127.0.0.1';
const port: number = 3000;
/**
 * The createServer() method of http creates a new HTTP server and returns it.
 * Specifying types for the 'req' and 'res' parameters in the callback function of createServer.
 * Explicitly specifying the type of the server variable as 'http.Server'.
 */

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  /**
   * Whenever a new request is received, the request event is called,
   * providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).
   * Those 2 objects are essential to handle the HTTP call.
   */
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

## 2. How to install Node.js

```bash
https://nodejs.org/download/.
```

## 3. How much JavaScript do you need to know to use Node.js?

> As a beginner, it's hard to get to a point where you are confident enough in your programming abilities. While learning to code, you might also be confused at where does JavaScript end, and where Node.js begins, and vice versa.
একজন শিক্ষানবিস হিসাবে, এমন একটি point পৌঁছানো কঠিন যেখানে আপনি আপনার programming দক্ষতার উপর যথেষ্ট আত্মবিশ্বাসী। কোড শেখার সময়, আপনি JavaScript কোথায় শেষ হবে এবং কোথায় Node.js শুরু হবে তা নিয়েও বিভ্রান্ত হতে পারেন, এবং এর বিপরীতে।

### What is recommended to learn before diving deep with Node.js?

- [Lexical Structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)
- [Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
- [Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables#what_is_a_variable)
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [this operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Scopes](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
- [ECMAScript 2015 (ES6) and beyond](https://nodejs.org/en/learn/getting-started/ecmascript-2015-es6-and-beyond)

With those concepts in mind, you are well on your road to become a proficient JavaScript developer, in both the browser and in Node.js.

### Asynchronous Programming

The following concepts are also key to understand asynchronous programming, which is one of the fundamental parts of Node.js:

- [Asynchronous programming and callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
- [Timers](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Async and Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [The Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)