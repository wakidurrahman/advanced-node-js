# 📖 Streams

Streams are one of the key features of Node.js. Most Node.js applications rely on the underlying Node.js `streams` implementation, be it for

- Reading/Writing files,
- Handling HTTP requests,
- Other Network communications.

Streams provide a mechanism to sequentially read input and write output.

> By reading chunks of data sequentially, we can work with vary large files(or other data input) that would generally be too large to read into memory and process as a whole.

> Streams are fundamental to big data applications or media streaming services, where the data is too large to consume at once.

## #️⃣ There are four fundamental stream types within Node.js:

1. `Readable`: streams from which data can be read (for example, `fs.createReadStream()`).
2. `Writable`: streams to which data can be written (for example, `fs.createWriteStream()`).
3. `Duplex`: streams that are both Readable and Writable (for example, `net.Socket`).
4. `Transform`: Duplex streams that can modify or transform the data as it is written and read (for example, `zlib.createDeflate()`).

**_Additionally, this module includes the utility functions `stream.pipeline()`, `stream.finished()`, `stream.Readable.from()` and `stream.addAbortSignal()`._**

## #️⃣ Creating streams in Node.js

The Node.js `stream` API is provided by the Node.js `stream` core module.

1. writable stream `fs.createWriteStream()`

`write-stream.js`

```js
const fs = require("fs");
const file = fs.createWriteStream("./file.txt");
```

2. readable stream `fs.createReadStream()`

`read-stream.js`

```js
const fs = require("fs");
const readStream = fs.createReadStream("./file-one.txt");
```

To check that the file exists, enter the following command in your Terminal:

```bash
$ ls -lh file.txt
```

`wrote` and `read` a file sequentially using the `createReadStream()` and `createWriteStream()` fs methods.

> The Node.js core `fs` module relies on the underlying Node.js `stream` core module.

> To access the node:stream module: `const stream = require('node:stream');`. The `node:stream` module is useful for creating new types of stream instances.**_ It is usually not necessary to use the `node:stream` module to consume streams._**

> **Generally, the Node.js `stream` core module is not interacted with directly.** You'd typically only interact with the Node.js `stream` implementation via higher-level APIs, such as those exposed by the `fs` module.

### Created a `writable` stream, via the `createWriteStream()` method, to sequentially `write` our file contents.

[fs.createWriteStream(path[, options])](https://nodejs.org/docs/latest-v20.x/api/fs.html#fscreatewritestreampath-options)

```bash
fs.createWriteStream(path[, options])
```

The `createWriteStream()` method accepts two `parameters`.
The first is the path of the `file` to write to, and the second is an `options` object that can be used to supply configuration to the stream.

- path `<string> | <Buffer> | <URL>`
- options `<string> | <Object>`
  - **flags**: `<string>` See support of file system flags. Default: `'w'`.
  - **encoding**: `<string>` Default: `'utf8'`
  - **fd**: `<integer> | <FileHandle>` Default: `null`
  - **mode**: `<integer>` Default: `0o666`
  - **autoClose**: `<boolean>` Default: `true`
  - **emitClose**: `<boolean>` Default: `true`
  - **start**: `<integer>`
  - **fs**: `<Object> | <null>` Default: `null`
  - **signal**: `<AbortSignal> | <null>` Default: `null`
  - **highWaterMark**: `<number>` Default: `16384`
  - **flush**: `<boolean>` If true, the underlying file descriptor is flushed prior to closing it. Default: `false`.

### Created a `readable stream` to sequentially read the contents of our file.

[fs.createReadStream(path[, options])](https://nodejs.org/docs/latest-v20.x/api/fs.html#fscreatereadstreampath-options)

```bash
fs.createReadStream(path[, options])
```

The `createReadStream()` method is an abstraction of a `readable stream`. This method expects two parameters – the first being the `path` to the contents to read, and the second an `options` object. The following table details the options we can pass to the `createReadStream()` method via an options object:

- path `<string> | <Buffer> | <URL>`
- options `<string> | <Object>`

  - **flags**: `<string>` See support of file system flags. Default: `'r'`.
  - **encoding**: `<string>` Default: `'null'`
  - **fd**: `<integer> | <FileHandle>` Default: `null`
  - **mode**: `<integer>` Default: `0o666`
  - **autoClose**: `<boolean>` Default: `true`
  - **emitClose**: `<boolean>` Default: `true`
  - **start**: `<integer>`
  - **end**: `<integer>` Default: `Infinity`
  - **highWaterMark**: `<number>` Default: `64 * 1024`
  - **fs**: `<Object> | <null>` Default: `null`
  - **signal**: `<AbortSignal> | <null>` Default: `null`

  All Node.js `streams` are instances of the `EventEmitter` class. Streams emit a series of different event.

  **_The following events are emitted on `readable streams`:_**

  ![readable stream](./readable-streams-emit-events.png)

  - `close`: Emitted when the stream and any of the stream's resources have been closed. No further events will be emitted
  - `data`: Emitted when new data is read from the stream
  - `end`: Emitted when all available data has been read
  - `error`: Emitted when the readable stream experiences an error
  - `open`: --
  - `pause`: Emitted when the readable stream is paused
  - `readable`: Emitted when there is data available to be read
  - `ready`: ---
  - `resume`: Emitted when a readable stream resumes after being in a paused state

  **_The following are the events emitted on `writable streams`_**

  ![writable streams](./writable-streams-emit-events.png)

- `close`: Emitted when the stream and any of the stream's resources have been closed. No further events will be emitted
- `drain`: Emitted when the writable stream can resume writing data
- `error`: Emitted when the writeable stream experiences an error
- `finish`: Emitted when the writeable stream has ended and all writes have completed
- `open`: ---
- `pipe`: Emitted when the stream.pipe() method is called on a readable stream
- `ready`: ---
- `unpipe`: Emitted when the stream.unpipe() method is called on a readable stream

## #️⃣ Dive deeper into `readable streams`.

- How to read from `infinite` data sources.
- How to use the more modern `asynchronous` iterator syntax with `readable streams`.

### 📝 Interacting with `infinite` data.

Streams make it possible to interact with `infinite` amounts of data.

### 📝 Readable streams with async iterators

Readable streams are `asynchronous iterables`. This means we can use the `for await ...of` syntax to loop over the stream data.

### 📝 Generating readable streams with `Readable.from()`

The `Readable.from()` method is exposed by the Node.js core `stream` module. This method is used to construct readable streams with iterators:

Define the asynchronous generator function.

```js
async function* generate() {
  yield "Node.js";
  yield "is";
  yield "a";
  yield "JavaScript";
  yield "Runtime";
}
```

The `function*` declaration creates a `binding` of a new generator function to a given name. A generator function can be exited and later re-entered, with its context (variable `bindings`) saved across re-entrances.

You can also define generator functions using the function\* expression.

```js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// Expected output: 10

console.log(gen.next().value);
// Expected output: 20
```

## #️⃣ Interacting with paused streams

A Node.js stream can be in either `flowing` or `paused` mode.

- In `flowing` mode, data chunks are read automatically,
- whereas in `paused` mode, the stream.read() method must be called to read the `chunks` of data.

```js
const fs = require("fs");
const readStream = fs.createReadStream("./file-one.txt");

/**
 * To interact with a `readable` stream in `paused mode` by
 * listening for the `readable` event and manually calling the read() method.
 * By default, a readable stream is in paused mode.
 *
 * When the readable stream is in paused mode,
 * it is necessary to manually call the readableStream.read() method to consume the  stream data.
 */

// added a `readable event handler` to our readable stream.
// to register a `readable` event handler on the `readable` stream:
readStream.on("readable", () => {
  // Read data
  // We can add the manual logic to read the data chunks within our readable handler.

  let data = readStream.read();
  while (data !== null) {
    console.log("Read chunk: ", data.toString());
    data = readStream.read();
  }
});
```

we learned how to interact with a readable stream that was in paused mode.

> **_By default, a readable stream is in paused mode._**

The `readable` stream switches to flowing mode in the following instances:

- When a `data event handler` is registered `readStream.on("data", () => { .. })`
- When the `pipe()` method is called
- When the `resume()` method is called

As our program in the above did none of these, our stream remained in `paused mode`.

If a `readable` stream was in `flowing mode`, it would switch back to `paused mode` in the following instances:

- When the pause() method is called and there are no pipe destinations
- When the unpipe() method is called on all pipe destinations

## #️⃣ Piping streams

A pipe is form of one-way redirection. In our terminal (DOS or Unix-like), we often utilize the pipe operator (|) to pipe the output of one program as the input to another program.

we can use the Node.js pipe() method to pipe data between streams.

`we'll learn how to pipe a readable stream to a writable stream`

```js
const fs = require("fs");
// First created a `readable stream` to read our `file.txt` file using the createReadStream() method.
const readStream = fs.createReadStream("./file.txt");

// We need to pipe our readable stream to `process.stdout`, which returns a writable stream connected to "STDOUT"

readStream.pipe(process.stdout);
```

First created a `readable stream` to read our `file.txt` file using the `createReadStream()` method.
Then piped the output of this `readable stream` to `process.stdout` (a `writable stream`) using the `pipe()` method.

The `pipe()` method attaches a `data event handler` to the source stream, which `writes` the incoming data to the destination stream.

The `pipe()` method is used to direct data through a flow a streams.

Under the covers, the pipe() method manages the flow of data to ensure that the destination writable stream is not overwhelmed by a faster readable stream.

The in-built management provided by the `pipe()` method helps resolve the issue of backpressure. Backpressure occurs when an input overwhelms a system's capacity. For streams, this could occur when we're consuming a stream that is rapidly reading data, and the writable stream cannot keep up. This can result in a large amount of memory being kept in-process before being written by the writable stream. The mass amount of data being stored in-memory can degrade our Node.js process performance, or in the worst cases, cause the process to crash.

By default, when using the `pipe()` method, `stream.end()` is called on the destination `writable stream` when the source `readable stream` emits and `end` event. This means that the destination is no longer writable.

To disable this default behavior, we can supply `{ end: false }` to the `pipe()` method via an options argument:

```js
sourceStream.pipe(destinationStream, { end: false });
```

This configuration instructs the destination stream to remain open even after the end event has been emitted by the source stream.

## #️⃣ Transforming data with transform streams

Transform streams allow us to consume input data, then process that data, and then output the data in processed form. We can use transform streams to handle data manipulation functionally and asynchronously.

`new stream.Transform([options])`

- options `<Object>` Passed to both Writable and Readable constructors. Also has the following fields:
  - transform: The `<Function>` Implementation for the `stream._transform()` method. The function that implements the data processing/transformation logic
  - flush: `<Function>` Implementation for the `stream._flush()` method. If the transform process emits additional data, the flush method is used to flush the data. This argument is optional

```js
const { Transform } = require("node:stream");

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    // ...
  },
});
```

A `Transform stream` is a `Duplex` stream where the output is computed in some way from the input. Which means they implement both `readable` and `writable` stream interfaces. Transform streams are used to process (or transform) the input and then pass it as output.

It is the `transform()` function that processes the stream input and produces the output.

📒 Note: that it is not necessary for the number of chunks supplied via the input stream to be equal to the number output by the transform stream – some chunks could be omitted during the transformation/processing.
There is no requirement that the output be the same size as the input, the same number of chunks, or arrive at the same time.

Under the covers, the `transform()` function gets attached to the `_transform()` method of the transform stream. The `_transform()` method is an internal method on the `Transform` `class` that is not intended to be called directly (hence the `_` `underscore` prefix).

The `_transform()` method accepts the following three arguments:

- chu`nk: The data to be transformed
- `encoding`: If the input is of the `String` type, the encoding will be of the `String` type. If it is of the `Buffer` type, this value is set to `buffer`
- `callback(err, transformedChunk)`: The callback function to be called once the chunk has been processed. The callback function is expected to have two arguments – the first an error and the second the transformed chunk

### 📝 ES6 syntax

As well as the simplified constructor approach used, transform streams can be written using ES6 class syntax:

```js
const { Transform } = require("node:stream");

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
}
```

### 📝 Creating object mode transform streams

By default, Node.js streams operate on `String`, `Buffer` or `Uint8Array` objects.

However, it is also possible to work with Node.js streams in `object mode`. In object mode, the values returned from the stream are generic JavaScript objects.

The main difference with `object mode` is that the `highWaterMark` value refers to the number of objects, rather than `bytes`. We've learned in previously that the `highWaterMark` value dictates the maximum number of `bytes` that are stored in the internal `buffer` before the stream stops reading the input. 

For `object mode` streams, this value is set to `16` – meaning `16 objects are buffered` at a time.

To set a stream in object mode, we pass `{ objectMode: true }` via the options object.