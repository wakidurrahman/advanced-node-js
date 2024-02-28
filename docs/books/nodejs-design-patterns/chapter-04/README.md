# 💁‍♂️ Asynchronous Control Flow Patterns with Callbacks

Asynchronous code can make it hard to predict the order in which statements are executed.

## #️⃣ The difficulties of asynchronous programming

Closures and in-place definitions of anonymous functions allow for a smooth programming experience that doesn't require the developer to jump to other points in the codebase.

The **KISS** principle (**_Keep It Simple, Stupid_**);

### 📝 Creating a simple web spider

### 📝 Callback hell

The situation where the abundance of closures and in-place callback definitions transforms the code into an unreadable and unmanageable blob is known as callback hell. (যে পরিস্থিতিতে প্রচুর পরিমাণে closures এবং in-place callback সংজ্ঞা কোডটিকে একটি অপঠনযোগ্য এবং নিয়ন্ত্রণের অযোগ্য ব্লবে রূপান্তরিত করে তা কলব্যাক হেল নামে পরিচিত।)

## #️⃣ 📝 Callback best practices and control flow patterns

There are several situations where controlling the flow of a set of asynchronous tasks requires the use of specific patterns and techniques especially if we are only using plain JavaScript without the aid of any external library.

### 📝 Callback discipline

The first rule to keep in mind is to not abuse in-place function definitions when defining callbacks.(মনে রাখা প্রথম নিয়ম হল কলব্যাক সংজ্ঞায়িত করার সময় in-place ফাংশন সংজ্ঞার অপব্যবহার না করা৷)

These are some basic principles that can help us keep the nesting level low and improve the organization of our code in general:

- **Exit as soon as possible**. Use `return`, `continue`, or `break`, depending on the context, to immediately exit the current statement instead of writing(and nesting) complete `if...else` statement.
- **Create name functions for callbacks**, keeping them out of closures and passing intermediate results as arguments. Naming our functions will also make them look better in stack traces.
- **Modularize the code**. Split the code into smaller, reusable functions whenever possible.

### 📝 Applying the callback discipline

1. The **first step**, we can refactor our `error-checking` pattern by removing the else statement.

```js
// This is often referred to as the **early return principle**.
if (err) {
  return cb(err);
}
// code to execute when there are no errors
```

2. Second optimization: we can try to identify reusable pieces of code.

```js
function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename))
    .then(() => {})
    .catch((err) => {});
}
```
