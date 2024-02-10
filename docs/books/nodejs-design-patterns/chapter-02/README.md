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



