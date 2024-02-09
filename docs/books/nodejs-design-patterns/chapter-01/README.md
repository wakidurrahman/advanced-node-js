# 💁‍♂️ The Node.js Platform

The most peculiar one is probably its asynchronous nature, which makes heavy use of asynchronous constructs such as `callbacks` and `promises`.

We will explore where Node.js gets its asynchronous behavior from. This is not just good-to-know theoretical information: knowing how Node.js works at its core will give you a strong foundation for understanding.

Another important aspect that characterizes Node.js is its philosophy. আরেকটি গুরুত্বপূর্ণ দিক যা Node.js কে বৈশিষ্ট্যযুক্ত করে তা হল এর দর্শন।
Approaching Node.js is, in fact, far more than simply learning a new technology: it's also embracing a culture and a community. Node.js-এর কাছে যাওয়া আসলে, একটি নতুন প্রযুক্তি শেখার চেয়ে অনেক বেশি: এটি একটি সংস্কৃতি এবং একটি সম্প্রদায়কে আলিঙ্গন করছে।

## #️⃣ The Node.js philosophy

Every programming platform has its own **philosophy**, a set of _principles_ and _guidelines_ that are generally accepted by the community, or an ideology for doing things that influence both the evolution of the platform and how applications are developed and designed.

In Node.js, some of these principles come directly from its creator **—Ryan Dahl—** while others come from the people who contribute to the core or from charismatic figures in **the community**, and, finally, some are inherited from the **larger JavaScript movement**.

### 📝 Small core

The Node.js core —understood as the Node.js runtime and built-in modules—(Node.js রানটাইম এবং বিল্ট-ইন মডিউল হিসাবে বোঝা যায়) has its foundations built on a few principles. এর ভিত্তি কয়েকটি নীতির উপর নির্মিত।

### 📝 Small modules

Node.js uses the concept of a module as the fundamental means for structuring the code of a program. It is the building block for creating applications and reusable libraries.

This principle has its roots in the Unix philosophy, and particularly in two of its precepts, which are as follows:

- "Small is beautiful."
- "Make each program do one thing well."

Node.js has brought these concepts to a whole new level. Along with the help of its module managers **—with `npm` and `yarn` being the most popular—** Node.js helps to solve the **_`dependency hell`_** problem by making sure that two (or more) packages depending on different versions of the same package will use their own installations of such a package, thus avoiding conflicts.

### 📝 Small surface area

In addition to being small in size and scope, a desirable characteristic of Node.js modules is exposing a minimal set of functionalities to the outside world. আকার এবং সুযোগে ছোট হওয়ার পাশাপাশি, Node.js মডিউলগুলির একটি পছন্দসই বৈশিষ্ট্য বহির্বিশ্বের কাছে কার্যকারিতার একটি ন্যূনতম সেট প্রকাশ করছে।

In Node.js, a very common pattern for defining modules is to expose only one `functionality`, such as a `function` or a `class`,

Another characteristic of many Node.js modules is the fact that they are created to be used, rather than extended. Locking down the internals of a module by forbidding any possibility of an extension might sound inflexible, but it actually has the advantage of reducing use cases, simplifying implementation, facilitating maintenance, and increasing usability. In practice, this means preferring to expose functions instead of classes, and being careful not to expose any internals to the outside world. অনেক Node.js মডিউলের আরেকটি বৈশিষ্ট্য হল এগুলিকে বর্ধিত করার পরিবর্তে ব্যবহার করার জন্য তৈরি করা হয়েছে। একটি মডিউলের অভ্যন্তরীণ অংশগুলিকে লক ডাউন করে একটি এক্সটেনশনের কোনও সম্ভাবনাকে বাধাগ্রস্ত করা অনমনীয় মনে হতে পারে, তবে এটি আসলে ব্যবহারের ক্ষেত্রে হ্রাস করা, বাস্তবায়নকে সরল করা, রক্ষণাবেক্ষণ সহজতর করা এবং ব্যবহারযোগ্যতা বাড়ানোর সুবিধা রয়েছে৷ অনুশীলনে, এর অর্থ ক্লাসের পরিবর্তে ফাংশনগুলি প্রকাশ করতে পছন্দ করা এবং বাইরের বিশ্বের কাছে কোনও অভ্যন্তরীণ প্রকাশ না করার বিষয়ে সতর্ক হওয়া।

### 📝 Simplicity and pragmatism

Keep It Simple, Stupid (KISS) principle

Designing simple, as opposed to perfect, fully featured software is a good practice for several reasons: it takes less effort to implement, it allows shipping faster with fewer resources, it's easier to adapt, and, finally, it's easier to maintain and understand.

## #️⃣ How Node.js works

Node.js works internally and be introduced to the **_reactor pattern_**, which is the heart of the asynchronous nature of Node.js.

The main concepts behind the pattern, such as the single-threaded architecture and the non-blocking I/O

### 📝 I/O is slow

I/O (short for input/output) is definitely the slowest among the fundamental
operations of operations of a computer.
I/O is usually not expensive in terms of CPU, but it adds a delay between the moment the request is sent to the device and the moment the operation completes.

### 📝 Blocking I/O

In traditional blocking `I/O` programming, the function call corresponding to an `I/O` request will block the execution of the `thread` until the **_operation completes_**. This is because each I/O operation on a socket will block the processing of any other connection.

### 📝 Non-blocking I/O

In addition to blocking I/O, most modern operating systems support another mechanism to access resources, called non-blocking I/O. In this operating mode, the system call always returns immediately without waiting for the data to be read or written.

The most basic pattern for dealing with this type of non-blocking I/O is to actively poll the resource within a loop until some actual data is returned. This is called **_busy-waiting_**.

Polling algorithms usually result in a huge amount of wasted CPU time.

### 📝 Event demultiplexing

We are talking about the **synchronous event demultiplexer** (also known as the **event notification interface**).

**_Multiplexing:_** the term, in telecommunications, multiplexing refers to the method by which multiple signals are combined into one so that they can be easily transmitted over a medium with limited capacity.

**_Demultiplexing:_** refers to the opposite operation, whereby the signal is split again into its original components. বিপরীত অপারেশন বোঝায়, যেখানে সংকেত আবার তার মূল উপাদানে বিভক্ত হয়।

The **synchronous event demultiplexer** watches multiple resources and returns a new event (or set of events) when a `read` or `write` operation executed over one of those resources completes. synchronous event demultiplexer একাধিক resources দেখে এবং একটি নতুন event (বা events সেট) ফেরত দেয় যখন সেই resources মধ্যে একটির উপর একটি read বা write ক্রিয়া সম্পন্ন হয়।

## #️⃣ The reactor pattern

The main idea behind the **_Reactor Pattern_** is to have a `handler` associated **with each I/O operation**. A `handler` in Node.js is represented by a `callback` (or `cb` for short) function. Reactor Pattern পিছনে মূল ধারণা হল প্রতিটি I/O অপারেশনের সাথে একটি handler যুক্ত করা। Node.js-এ একটি handler একটি callback (বা সংক্ষেপে cb) function দ্বারা প্রতিনিধিত্ব করা হয়। The handler will be invoked as soon as an event is produced and processed by the event loop. 

> [!NOTE]
> A Node.js application will exit when there are no more pending operations in the event demultiplexer, and no more events to be processed inside the event queue.

> [!IMPORTANT]
> **`The reactor pattern:`** Handles I/O by blocking until new events are available from a set of observed resources, and then reacts by dispatching each event to an associated handler.

## #️⃣ Libuv, the I/O engine of Node.js