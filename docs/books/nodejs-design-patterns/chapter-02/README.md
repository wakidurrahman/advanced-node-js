# 💁‍♂️ The Module System

Node.js currently comes with two different module systems:

1. CommonJS(CJS)
2. ECMAScript Modules (ESM or ES modules).

## #️⃣ The need for modules

A good module system should help with addressing some fundamental needs of software engineering: একটি ভাল module system সফ্টওয়্যার ইঞ্জিনিয়ারিং এর কিছু মৌলিক চাহিদা পূরণে সহায়তা করবে:

- **_Having a way to split the codebase into multiple files_**. কোডবেসটিকে একাধিক ফাইলে বিভক্ত করার একটি উপায় রয়েছে।
- **_Allowing code reuse across different projects_**. বিভিন্ন প্রকল্প জুড়ে কোড পুনরায় ব্যবহার করার অনুমতি দেয়।
- **_Encapsulation (or information hiding)_**. এনক্যাপসুলেশন It is generally a good idea to hide implementation complexity and only expose simple interfaces with clear responsibilities.
- **_Managing dependencies_**

It is important to clarify the distinction between a `module` and a `module system`.

- **`a module`**: we can define `a module` as the actual unit of software.
- **`a module system`**: `a module system` is **the syntax** and **the tooling** that allows us to define `modules` and to use them within our projects.

### 📝 Module systems in JavaScript and Node.js

- AMD: **_asynchronous module definition_** popularized by RequireJS
- UMD: **_Universal Module Definition_**
- The browser landscape thanks to `module bundlers` like `Browserify` and `webpack`
- CommonJS has been the dominant module system in Node.js
- ESM or ECMAScript modules: In 2015, with the release of ECMAScript 6 (also called ECMAScript 2015 or ES2015),

ESM: it tries to bridge the gap between how modules are managed on `browsers` and `servers`.

### 📝 The module system and its patterns

Modules are the bricks for structuring non-trivial applications and the main mechanism to enforce information hiding by keeping private all the `functions` and `variables` that are not explicitly marked to be exported.

### 📝 The revealing module pattern

One of the bigger problems with JavaScript in the browser is the lack of namespacing. Every `script` runs in the `global scope`; therefore, `internal` `application` `code` or `third-party` dependencies can pollute the `scope` while exposing their own pieces of functionality.

A popular technique to solve this class of problems is called the `revealing module pattern`, and it looks like this:

```js
const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})(); // once the parenthesis here are parsed, the function will be invoked

console.log(myModule);
console.log(myModule.privateFoo, myModule.privateBar);
```

This pattern leverages a self-invoking function. This type of function is sometimes also referred to as **_Immediately Invoked Function Expression (IIFE)_** and it is used to create a private scope, exporting only the parts that are meant to be public.

In the preceding code, the myModule variable contains only the exported API, while the rest of the module content is practically inaccessible from outside.

This demonstrates that only the exported properties are directly accessible from myModule.

## #️⃣ CommonJS modules

CommonJS is the first `module system` originally built into Node.js.

Let's summarize two of the main concepts of the CommonJS specification:

1. `require`: is a function that allows you to import a module from the local filesystem
2. `exports`: and `module.exports` are special `variables` that can be used to `export` **_public functionality_** from the current `module`.

### 📝 A homemade module loader

To understand how CommonJS works in Node.js, let's build a similar system from scratch.
The code that follows creates a function that mimics a subset of the functionality of the original `require()` function of Node.js.

### 📝 Defining a module

The essential concept to remember is that everything inside a `module` is `private` unless it's assigned to the `module.exports` `variable`.

### 📝 module.exports versus exports



