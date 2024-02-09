# 💁‍♂️ The Module System

Node.js currently comes with two different module systems:

1. CommonJS(CJS)
2. ECMAScript Modules (ESM or ES modules).

## #️⃣ The need for modules

A good module system should help with addressing some fundamental needs of software engineering: একটি ভাল module system সফ্টওয়্যার ইঞ্জিনিয়ারিং এর কিছু মৌলিক চাহিদা পূরণে সহায়তা করবে:

- Having a way to split the codebase into multiple files. কোডবেসটিকে একাধিক ফাইলে বিভক্ত করার একটি উপায় রয়েছে।
- Allowing code reuse across different projects. বিভিন্ন প্রকল্প জুড়ে কোড পুনরায় ব্যবহার করার অনুমতি দেয়।
- Encapsulation (or information hiding). এনক্যাপসুলেশন It is generally a good idea to hide implementation complexity and only expose simple interfaces with clear responsibilities.
- Managing dependencies

It is important to clarify the distinction between a `module` and a `module system`.

- **`a module`**: we can define `a module` as the actual unit of software.
- **`a module system`**: `a module system` is **the syntax** and **the tooling** that allows us to define `modules` and to use them within our projects.

### 📝 Module systems in JavaScript and Node.js
