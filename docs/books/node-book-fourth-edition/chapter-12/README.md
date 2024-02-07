# 💁‍♂️ Debugging Node.js

Over the past decade, Node.js has matured as a technology, and the debugging capabilities and facilities have improved accordingly.

## #️⃣ Diagnosing issues with Chrome DevTools

Node.js exposes a debugging utility via the --inspect process flag, which enables us to `debug` and `profile` our Node.js `processes` using the `Chrome DevTools` interface.

The ability to `debug` Node.js applications is provided by the `V8` JavaScript engine. When we pass the node process the `--inspect` argument e.i. `node --inspect server.js`, the Node.js process starts to listen for a debugging client. Specifically, it is the `V8` inspector that opens a `port` that accepts `WebSocket` connections. The WebSocket connection allows the `client` and `V8` inspector to interact.

![breakpoint](./breakpoint.png)

we set a breakpoint in the Chrome DevTools window. When the line of code the breakpoint is registered on is encountered, the event loop (JavaScript thread) will be paused. The V8 inspector will then send a message to the client over the WebSocket connection. The message from the V8 inspector details the position and state of the program. The client can update its state based on the information it receives.

> [!NOTE] Pausing a process on start
> Node.js also provides a flag that we can use to pause an application on start. This feature enables us to set up breakpoints before anything executes. It can also help when debugging an error that occurs during the setup phase of your application.

> [!TIP]
> This feature can be enabled with the `--inspect-brk` flag. The following is how we'd start `server.js` using the `--inspect-brk` flag: `$ node --inspect-brk server.js`.

### 📝 command-line-based debugger

```sh
$ node inspect server.js
```

This command will take us into debug mode and output the first three lines of `server.js`

```sh
debug> list(11)

debug> setBreakpoint(7)
# or
debug> sb(7)

```

## #️⃣ Logging with Node.js

Effective logging can help you understand what is going on in an application. Logs can help triage causes of crashes or failures retrospectively by helping you to see what was happening in your application prior to the crash or failure.

Logging can also be used to help collate data. As an example, if you log all accesses to endpoints on your web application, you could collate all the request logs to determine what the most visited endpoints are.

We will look at logging with

- pino
  - pino
  - express-pino-logger
- Morgan
- Winston

We will make use of the `express-pino-logger` module to add logging via an `Express.js` `middleware`. First, start by installing the `pino` and `express-pino-logger` modules

```sh
$ npm install pino express-pino-logger
```

`express-pino-logger` is a middleware that enables `Pino` logging on our `Express.js` web server. We import these independently so that we can interact with the `pino` logger both directly and via our middleware.

The Pino interface is based on `Log4j`. `Log4j` is an Apache logger written for `Java`, but interpretations of its interface have been implemented across many languages.

Pino allows you to group your error messages by level. The levels are `trace`, `debug`, `info`, `warn`, `error`, and `fatal`. The default logging level is set to `info`.

```sh
$ curl -I http://localhost:3000
```

### 📝 Logging with Morgan

Morgan is an `HTTP request` logger middleware for `Node.js`. Note that Morgan is focused on providing `HTTP logging` and is not used as a general-purpose extensible logger. Morgan is commonly used with Express.js and is maintained under the Express.js GitHub organization (https://github.com/expressjs/morgan).

```sh
const logger = require('morgan');

app.use(logger('dev'));
```

The parameter `dev` indicates we want development formatted logging. In Morgan, development-level logging is concise output colored by the response status. Morgan provides the following predefined formats:

- • `combined`: Apache-style combined output
- • `common`: Apache-style output
- • `dev`: Concise color-coded output
- • `short`: Shorter output
- • `tiny`: Minimal output

### 📝 Logging with Winston

Winston is another popular logger for Node.js. Winston exposes an interface that is also similar to the `Log4j` interface.

The main difference between **`Pino`** and **`Winston`** is that Winston provides a larger number of **features** and **configuration** options.

```sh

$ npm install winston express-winston

```

## #️⃣ Enabling debug logs

`debug` is a popular library, used by many notable frameworks, including the `Express.js` and `Koa.js` web frameworks and the `Mocha` test framework. `debug` is a small JavaScript `debugging` utility based on the `debugging` technique used in Node.js core.

```sh
$ DEBUG=* node server.js

$ DEBUG=express:router* node server.js
```

We first prepend `DEBUG=*` to our start command. This syntax passes an environment variable named `DEBUG` to our `Node.js` `process`, which can be accessed from within the application via `process.env.DEBUG`.

> [!IMPORTANT]
> We set the value to **`*`**, which enables all logs.

we filter out logs by setting **`DEBUG=express:router*`**. Internally, the debug module is converting the values we set to regular expressions.

## #️⃣ Enabling Node.js core debug logs

When debugging some problems in your applications, it can be useful to have insight into the internals of Node.js and how it handles the execution of your program. Node.js provides debug logs that we can enable to help us understand what is happening internally in Node.js.

These core debug logs can be enabled via an `environment` variable named `NODE_DEBUG`.

we can enable the core debug logs to allow us to see what is happening at the Node.js runtime level.

To set the `NODE_DEBUG` variable to the internal flag we wish to log.

> [!IMPORTANT]
> The internal flags align with specific subsystems of Node.js, such as `timers` or `HTTP`.

To enable the `timer` **_`core debug logs`_**, start your server with the following command:

```sh
$ NODE_DEBUG=timer node server.js
$ NODE_DEBUG=http node server.js

# It is also possible to enable debug logs on multiple subsystems via the NODE_DEBUG environment variable.
$ NODE_DEBUG=http,timer node server.js
# or

 "scripts": {
    "nodejs-core-debug-logs:timer": "NODE_DEBUG=timer node server.js",
    "nodejs-core-debug-logs:http": "NODE_DEBUG=http node server.js",
    "nodejs-core-debug-logs:multiple-subsystems": "NODE_DEBUG=http,timer node server.js",
    "start": "node server.js"
  },
```

It is also possible to enable debug logs on multiple subsystems via the `NODE_DEBUG` environment variable. `$ NODE_DEBUG=http,timer node server.js`

The output of each log message includes the subsystem/namespace, followed by the **process identifier (PID)**, and then the log message.

## #️⃣ Increasing stack trace size

A stack trace, sometimes referred to as a stack backtrace, is defined as a list of stack frames. When your Node.js process hits an `error`, a stack trace is shown detailing the function that experienced the error, and the functions that it was called by.

> [!NOTE]
> By default, Node.js's `V8` engine will return `10` `stack frames`.

When debugging some errors, it can be useful to have more than 10 stack frames. The number of stack frames stored comes with a performance cost. Keeping track of additional stack frames will result in our applications consuming more `memory` and `CPU`.

```js
 "scripts": {
    "stack-trace-limit": "node --stack-trace-limit=20 server.js",
    "start": "node --watch server.js"
  },

```

we make use of the `--stack-trace-limit` flag. This flag instructs the `V8` JavaScript engine to retain more stacks. When an `error` occurs, the stack trace will show the preceding function calls up to the limit set with the flag.

Asynchronous stack traces were added to Node.js 12 via the V8 JavaScript engine update, these can help us debug our asynchronous functions.

## #️⃣ Creating diagnostic reports

The diagnostic report utility has been available behind a process flag since Node.js v11.8.0.

The diagnostic report utility allows you to generate a report containing diagnostic data on demand or when certain events occur.

The situations

- 👉 where a report could be generated include
- 👉 when your application crashes, or
- 👉 when your application is experiencing slow performance or
- 👉 high CPU usage.

we'll learn how to enable and configure the diagnostic report utility and generate a report when an uncaught exception happens in our application.


The diagnostic report utility enables a diagnostic summary to be written in a file under certain conditions. The utility is built into `Node.js` core and is enabled by passing one of the following command-line `flags` to the Node.js process:

- `--report-uncaught-exception`: As used in the recipe, it triggers a crash on an uncaught exception.
- `--report-on-signal`: A report is triggered upon receiving a specified signal.
- `--report-on-fatalerror`: A report is triggered on a fatal error, such as an out of memory error.

Note that it is also possible to trigger the generation of the report from within your application using the following line:

```sh
process.report.writeReport();
```