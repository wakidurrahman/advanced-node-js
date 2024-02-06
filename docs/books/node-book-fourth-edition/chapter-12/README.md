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