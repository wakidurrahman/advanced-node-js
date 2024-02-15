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

