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

### 📝 Sequential execution

Executing a set of tasks in sequence means running them one at a time, one after the other. The order of execution matters and must be preserved, because the result of a task in the list may affect the execution of the next.

There are different variation of this flow:

- Executing a set of known task in sequence, without propagation data across them.
- Using the output of a task as the input for the next (also known as _chain_ , _pipeline_ or _waterfall_ )
- Iterating over a collection while running an asynchronous task on each element, one after the other.

### 📝 Executing a known set of tasks in sequence

### 📝 Sequential iteration

what happens if we want to execute an asynchronous operation for each item in a collection? In cases such as this, we can't hardcode the task sequence anymore; instead, we have to build it dynamically.

### 📝 Web spider version 2

### 📝 Sequential crawling of links

### 📝 The pattern

It's a pattern that can be adapted to any other situation where we need to iterate asynchronously over the elements of a collection or, in general, over a list of tasks.

```js
function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task(() => iterate(index + 1));
}
function finish() {
  // iteration completed
}
iterate(0);
```

The pattern that was just presented is very powerful and can be extended or adapted to address several common needs.

- We can map the values of an array asynchronously.
- We can pass the results of an operation to the next one in the iteration to implement an asynchronous version of the reduce algorithm.
- We can quit the loop prematurely if a particular condition is met
- We can even iterate over an infinite number of elements.

We could also choose to generalize the solution even further by wrapping it in a function with a signature such as the following

```js
iterateSeries(collection, iteratorCallback, finalCallback);
```

Here,

1. `collection` : is the actual dataset you want to iterate over.
2. `iteratorCallback` : is the function to execute over every item.
3. `iteratorCallback` : is the function that gets executed when all the items are processed or in case of an error..

> [!NOTE] > **The Sequential Iterator pattern :** Execute a list of tasks in sequence by creating a function named `iterator`, which invokes the next available task in the collection and makes sure to invoke the next step of the iteration when the current task completes.


### 📝 Parallel execution

We can only execute asynchronous operations in parallel, because their concurrency is handled internally by the non-blocking APIs. 

### 📝 Web spider version 3

### 📝 The pattern

The Unlimited Parallel Execution pattern: Run a set of asynchronous tasks in parallel by launching them all at once, and then wait for all of them to complete by counting the number of times their callbacks are invoked.

### 📝 Fixing race conditions with concurrent tasks


### 📝 Limited parallel execution

A server that spawns unbounded parallel tasks to handle a user request could be exploited with a denial-of-service (DoS) attack.