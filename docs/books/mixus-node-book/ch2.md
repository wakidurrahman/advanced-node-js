# Mixu's Node book

> A book about using Node.js

## 2. What is Node.js?

Node - or Node.js as it is called distinguish it from other "nodes" - is an `event-driven` `I/O` framework for the `V8` JavaScript `engine`. Node.js allows Javascript to be executed on the `server side`, and it uses the wicked fast `V8` Javascript engine which was developed by Google for the Chrome browser.

The basic philosophy of node.js is:

- `Non-blocking` I/O - every I/O call must take a callback, whether it is to retrieve information from disk, network or another process.
- Build-in support for the most important protocols(`HTTP`, `DNS`, `TLS`)
- Low-level. Do not remove functionality present at the `POSIX` layer. For example, support half-close `TCP` connections.
- Stream everything: never force ths buffering of data.

---

**_Abbreviation_**

1. **HTTP:** stands for `"Hypertext Transfer Protocol"`. It is an application layer protocol that forms the foundation of data communication on the World Wide Web.
2. **DNS:** stands for `"Domain Name System"`. The Domain Name System is a hierarchical and distributed naming system that is used to translate human-readable domain names (like `www.example.com`) into IP addresses that machines on a network can understand.
3. **TLS:** stands for `"Transport Layer Security."` It is a cryptographic protocol designed to provide secure communication over a computer network. TLS is the successor to the earlier SSL (Secure Sockets Layer) protocol.
4. **SSL:** stands for `"Secure Sockets Layer"`. It was a cryptographic protocol designed to provide secure communication over a computer network, particularly the internet. SSL was developed to ensure the confidentiality and integrity of data exchanged between a `web browser` and a `web server`.
5. **TCP:** stands for `"Transmission Control Protocol"`. It is one of the main protocols in the Internet Protocol (IP) suite, and together with IP, it forms the foundation for internet communication. TCP is a connection-oriented protocol that provides reliable, ordered, and error-checked delivery of `data` between `devices` on a `network`.
6. **_POSIX_** stands for `"Portable Operating System Interface"`. It is a set of standards that define the application programming interface (API), command line interface, and the shell and utilities interface for software compatibility with variants of `Unix` and other operating systems.

---

Node.js is different from client-side Javascript in that it remove certain think like DOM manipulation, window object.

Node.js adds support for

- evented I/O
- processes,
- streams
- HTTP
- SSL
- DNS
- string and buffer processing
- c/c++ addons.

### how does node run your code?

### The Event Loop - understanding how Node executes Javascript code

The `event loop` is a mechanism which allows you to specify what happens when a particular event occurs.

when you start an operation like reading a file, you can pass control back to Node and have your code run when the data has been read.

```js
// read the file /etc/passwd, and call console.log on the returned data
fs.readFile("/etc/passwd", function (err, data) {
  console.log(data);
});
```

You can think of the event loop as a simple list of tasks (code) bound to events.
When an event happens, the code/ task associated with the event is executed.

```bash
Remember: that all of your code in Node is running in a single process. There is no parallel execution of Javascript code that you write - you can only be running a single piece of code at any time.
```

Consider the following code.

1. We set a function to be called after 1000 milliseconds using setTimeout() and then
2. start a loop that blocks for 4 seconds.

```js
// Set function to be called after 1 second
setTimeout(() => {
  console.log(`Timeout run at ${new Date().toTimeString()}`);
}, 1000);

// Store the start time
let startTime = new Date();
console.log(`Enter loop at : ${startTime.toTimeString()}`);

// Run a loop for 4 seconds
let i = 0;
// increment i while (current time < start time + 4000 ms)
while (new Date().getTime() < startTime.getTime() + 4000) {
  i++;
}

console.log(
  `Exit loop at: ${new Date().toTimeString()} . Ran ${i}  iterations.`
);
```

Because your code executes in a single process, the output looks like this:

```bash
$ node ch2.js

Enter loop at : 12:55:38 GMT+0900 (Japan Standard Time)
Exit loop at: 12:55:42 GMT+0900 (Japan Standard Time) . Ran 84363725  iterations.
Timeout run at 12:55:42 GMT+0900 (Japan Standard Time)
```

Notice how the setTimeout function is only triggered after `four seconds`. This is because Node `cannot` and `will not` interrupt the `while loop`.

The `event loop` is only used to determine what to do next when the execution of your code finishes, which in this case is after four seconds of forced waiting.

If you have a `CPU-intensive` task that takes `four seconds` to complete, then a `Node server` would not be able to `respond` to other requests during those four seconds, since the event loop is only checked for new tasks once your code finishes.

Node is about taking a simple idea (single-process event loops), and seeing how far one can go with it.

Even with a single process model, you can move `CPU-intensive` work to other `background processes`, for example by setting up a

- queue which is processed by a pool of workers,
- or by load balancing over multiple processes.

If you are performing CPU-bound work, then the only real solutions are to either figure out a better algorithm (to use less CPU) or to scale to multiple cores and multiple machines (to get more CPU's working on the problem).

The premise/example/instance of Node is that I/O is the main bottleneck of many(if not most) tasks.
A single I/O operation can take millions of CPU cycles, and **in traditional, non-event-loop-based frameworks the execution is blocked for that time**.

In Node, I/O operations such as reading a file are performed asynchronously.
This is simply a fancy way of saying that you can pass control back to the event loop when you are performing I/O, like reading a file, and specify the code you want to run when the data is available using a callback function.

```js
// Reading a file
setTimeout(() => {
  console.log(`setTimeout at: ${new Date().toTimeString()}`);
}, 1000);

// when you start an operation like reading a file,
// you can pass control back to Node and have your code run when the data has been read.
fs.readFile("./file/test.txt", "utf8", (err, result) => {
  // when the data has been read event loop gets to run
  if (err) throw err;
  console.log("Read file Data: ", result.toString());
});
```

Here, we are reading a file using an asynchronous function, `fs.readFile()`, which takes as arguments the `name of the file` and a `callback` function. When Node executes this code, it starts the `I/O operation` in the background. Once the execution has passed over `fs.readFile()`, **control is returned back to Node**, and the **event loop** gets to run.

When the I/O operation is complete, the callback function is executed, passing the data from the file as the second argument. If reading the file takes longer than 1 second, then the function we set using setTimeout will be run after 1 second - before the file reading is completed.

Having asynchronous I/O is good,

The event loop is simply a way of coordinating what code should run during I/O, which executes whenever your code finishes executing. 
More formally, an event loop is `“an entity that handles and processes external events and converts them into callback invocations”`.
