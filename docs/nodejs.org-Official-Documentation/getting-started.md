# Getting Started

It covers a wide range of topics and is regularly updated.

## 1. Introduction to Node.js

> A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.
> একটি Node.js অ্যাপ প্রতিটি অনুরোধের জন্য একটি নতুন থ্রেড তৈরি না করে একটি একক প্রক্রিয়ায় চলে। Node.js তার স্ট্যান্ডার্ড লাইব্রেরিতে অ্যাসিঙ্ক্রোনাস I/O আদিমগুলির একটি সেট সরবরাহ করে যা জাভাস্ক্রিপ্ট কোডকে ব্লক করা থেকে বাধা দেয় এবং সাধারণত, Node.js-এর লাইব্রেরিগুলি নন-ব্লকিং প্যারাডাইম ব্যবহার করে লেখা হয়, ব্লকিং আচরণকে আদর্শের পরিবর্তে ব্যতিক্রম করে তোলে।

> When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
> যখন Node.js একটি I/O ক্রিয়াকলাপ সম্পাদন করে, যেমন নেটওয়ার্ক থেকে পড়া, একটি ডাটাবেস বা ফাইল সিস্টেম অ্যাক্সেস করা, থ্রেড ব্লক করার পরিবর্তে এবং অপেক্ষায় থাকা CPU চক্র নষ্ট করার পরিবর্তে, প্রতিক্রিয়া ফিরে এলে Node.js অপারেশনগুলি পুনরায় শুরু করবে।

> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.
> এটি Node.js-কে থ্রেড কনকারেন্সি পরিচালনার বোঝা প্রবর্তন না করে একটি একক সার্ভারের সাথে হাজার হাজার সমবর্তী সংযোগ পরিচালনা করতে দেয়, যা বাগগুলির একটি উল্লেখযোগ্য উত্স হতে পারে।

```ts
// Importing the http module
import * as http from "http";

// Defining types for hostname and port.
const hostname: string = "127.0.0.1";
const port: number = 3000;
/**
 * The createServer() method of http creates a new HTTP server and returns it.
 * Specifying types for the 'req' and 'res' parameters in the callback function of createServer.
 * Explicitly specifying the type of the server variable as 'http.Server'.
 */

const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    /**
     * Whenever a new request is received, the request event is called,
     * providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).
     * Those 2 objects are essential to handle the HTTP call.
     */
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

## 2. How to install Node.js

```bash
https://nodejs.org/download/.
```

---

## 3. How much JavaScript do you need to know to use Node.js?

> As a beginner, it's hard to get to a point where you are confident enough in your programming abilities. While learning to code, you might also be confused at where does JavaScript end, and where Node.js begins, and vice versa.
> একজন শিক্ষানবিস হিসাবে, এমন একটি point পৌঁছানো কঠিন যেখানে আপনি আপনার programming দক্ষতার উপর যথেষ্ট আত্মবিশ্বাসী। কোড শেখার সময়, আপনি JavaScript কোথায় শেষ হবে এবং কোথায় Node.js শুরু হবে তা নিয়েও বিভ্রান্ত হতে পারেন, এবং এর বিপরীতে।

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

---

#### Lexical Structure (আভিধানিক গঠন)

This page describes JavaScript's lexical grammar. JavaScript source text is just a sequence of characters — in order for the interpreter to understand it, the string has to be parsed to a more structured representation.

#### Expressions

Expressions and operators by category

- Primary expressions
- Left-hand-side expressions
- Increment and decrement
- Unary operators
- Arithmetic operators
- Relational operators
- Equality operators
- Bitwise shift operators
- Binary bitwise operators
- Binary logical operators
- Conditional (ternary) operator
- Assignment operators
- Yield operators
- Spread syntax
- Comma operator

---

## 4. Differences between `Node.js` and the Browser

Both the browser and `Node.js` use JavaScript as their programming language. Building apps that run in the browser is a completely different thing than building a `Node.js` application. Despite the fact that it's always JavaScript, there are some key differences that make the experience radically different.

**_What changes is the ecosystem._**

In the `browser`, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like `Cookies`. Those do not exist in Node.js, of course. You don't have the `document`, `window` and all the other objects that are provided by the `browser`.

And in the browser, we don't have all the nice APIs that `Node.js` provides through its `modules`, like the `filesystem` `access` functionality.

Another big difference is that in `Node.js` you control the `environment`. Compared to the `browser` environment, where you don't get the luxury to choose what browser your visitors will use, this is very convenient.

This means that you can write all the modern `ES2015` + `JavaScript` that your `Node.js` version supports. Since JavaScript moves so fast, but browsers can be a bit slow to upgrade, sometimes on the web you are stuck with using older `JavaScript` / `ECMAScript` releases. You can use `Babel` to transform your code to be `ES5-compatible` before shipping it to the `browser`, but in `Node.js`, you won't need that.

Another difference is that `Node.js` supports both the `CommonJS` and `ES module` systems (since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented.

In practice, this means that you can use both `require()` and `import` in Node.js, while you are limited to `import` in the browser.

---

### 5. The V8 JavaScript Engine

V8 is the name of the JavaScript engine that powers Google Chrome.

V8 is the JavaScript engine i.e. it `parses` and `executes` JavaScript code. The `DOM`, and the other `Web Platform APIs` (they all makeup `runtime` `environment`) are provided by the browser.

The cool thing is that the JavaScript engine is `independent` of the browser in which it's `hosted`.

This key feature enabled the rise of `Node.js`. `V8` was chosen to be the engine that powered `Node.js` back in 2009, and as the popularity of `Node.js` exploded, V8 became the engine that now powers an incredible amount of `server-side` code written in JavaScript.

Other browsers have their own `JavaScript engine`:

- Firefox has `SpiderMonkey`
- Safari has `JavaScriptCore` (also called Nitro)
- Edge was originally based on `Chakra` but has more recently been rebuilt using `Chromium` and the `V8` engine.

All those engines implement the `ECMA ES-262` standard, also called `ECMAScript`, the standard used by JavaScript.

**_Compilation_**

JavaScript is generally considered an `interpreted` language, but modern JavaScript engines no longer just `interpret` `JavaScript`, they `compile` it.

This has been happening since 2009, when the `SpiderMonkey` ( Firefox JavaScript engine) JavaScript `compiler` was added to `Firefox 3.5`, and everyone followed this idea.

---

### 6 An introduction to the NPM package manager

**_Introduction to npm_**

`npm` is the standard package manager for Node.js.

**_Installing all dependencies_**

If a project has a `package.json` file, by running

```
npm install
```

it will install everything the project needs, in the `node_modules` folder,

install a specific package by running

```
npm install <package-name>
```

Furthermore, since npm 5, this command adds `<package-name>` to the package.json file dependencies. Before version 5, you needed to add the flag --save.

Often you'll see more flags added to this command:

- `--save-dev` installs and adds the entry to the package.json file `devDependencies`
- `--no-save` installs but does not add the entry to the package.json file `dependencies`
- `--save-optional` installs and adds the entry to the package.json file `optionalDependencies`
- `--no-optional` will prevent optional dependencies from being installed

Shorthands of the flags can also be used:

- `-S`: `--save`
- `-D`: `--save-dev`
- `-O`: `--save-optional`

The difference between `devDependencies` and `dependencies` is that the former contains development tools, like a testing library, while the latter is bundled with the app in production.

**_Updating packages_**

Updating is also made easy, by running `npm update`

single package to update as well: `npm update <package-name>`

**_Versioning_**

Install a specific version of a package, by running `npm install <package-name>@<version>`

**_Running Tasks_**

The package.json file supports a format for specifying command line tasks that can be run by using `npm run <task-name>`

For example:

```js
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}

```

It's very common to use this feature to run Webpack:

```js
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

So instead of typing those long commands, which are easy to forget or mistype, you can run

```js
$ npm run watch
$ npm run dev
$ npm run prod
```

---

### 7. ECMAScript 2015 (ES6) and beyond.

Node.js is built against modern versions of V8. By keeping up-to-date with the latest releases of this engine, we ensure new features from the JavaScript [ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements. Node.js V8 এর আধুনিক সংস্করণের বিপরীতে নির্মিত। এই ইঞ্জিনের সর্বশেষ রিলিজগুলির সাথে আপ-টু-ডেট রাখার মাধ্যমে, আমরা নিশ্চিত করি যে JavaScript ECMA-262 স্পেসিফিকেশন থেকে নতুন বৈশিষ্ট্যগুলি একটি সময়মত Node.js ডেভেলপারদের কাছে আনা হয়েছে, সেইসাথে ক্রমাগত কর্মক্ষমতা এবং স্থিতিশীলতার উন্নতি।

All ECMAScript 2015 (ES6) features are split into three groups for shipping, staged, and in progress features:

- **_All shipping_** features, which `V8` considers `stable`, are turned **_on by default on Node.js_** and do ***NOT*** require any kind of `runtime flag`.
- **_Staged_** features, which are almost-completed features that are not considered stable by the `V8` team, require a runtime flag: `--harmony`.
- In **_progress_** features can be activated individually by their respective `harmony` flag, although this is **highly discouraged** unless for testing purposes. ***`Note:`*** these flags are exposed by V8 and will potentially change without any deprecation notice.

---

### 8. Node.js, the difference between `development` and `production`.

You can have different configurations for `production` and `development` environments.

Node.js assumes it's always running in a `development` environment. You can signal `Node.js` that you are running in `production` by setting the `NODE_ENV=production` environment variable.

This is usually done by executing the command
```bash
export NODE_ENV=production
```

You can also apply the environment variable by prepending it to your application initialization command:
```bash
NODE_ENV=production node app.js
```

This environment variable is a convention that is widely used in external libraries as well.

Setting the environment to 1 generally ensures that

- logging is kept to a minimum, essential level
- more caching levels take place to optimize performance

For example `Pug`, the templating library used by `Express`, compiles in debug mode if `NODE_ENV` is not set to `production`. Express views are compiled in every request in `development` mode, while in `production` they are `cached`.

You can use conditional statements to execute code in different environments:
```bash
if (process.env.NODE_ENV === 'development') {
  // ...
}
if (process.env.NODE_ENV === 'production') {
  // ...
}
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

In an Express app, you can use this to set different error handlers per environment:
```bash
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```

---

### 9. Node.js with TypeScript

First thing to do is to install TypeScript in our project:
```bash
npm i -D typescript
```

Take a look at this code snippet and then we can unpack it together

```ts
type User = {
  name: string;
  age: number;
};
function isAdult(user: User): boolean {
  return user.age >= 18;
}
const justine: User = {
  name: 'Justine',
  age: 23,
};
const isJustineAnAdult: boolean = isAdult(justine);
```

Assuming that our file is named `example.ts`, the command would look like:
```bash
npx tsc example.ts
```

### 10. Node.js with WebAssembly
