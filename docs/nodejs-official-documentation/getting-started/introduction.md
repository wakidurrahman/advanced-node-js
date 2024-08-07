# Introduction to Node.js

> Node.js is an

- open-source
- cross-platform
- JavaScript runtime environment

> Node.js runs the V8 JavaScript engine.

> A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library.

> When Node.js performs an I/O operation like

- Reading from the network,
- Accessing a database
- The filesystem

Instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.

This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency
