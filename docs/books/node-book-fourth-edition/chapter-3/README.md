# 📖 Streams

Streams are one of the key features of Node.js. Most Node.js applications rely on the underlying Node.js `streams` implementation, be it for

- Reading/Writing files,
- Handling HTTP requests,
- Other Network communications.

Streams provide a mechanism to sequentially read input and write output.

> By reading chunks of data sequentially, we can work with vary large files(or other data input) that would generally be too large to read into memory and process as a whole.

> Streams are fundamental to big data applications or media streaming services, where the data is too large to consume at once.

**_There are four main types of streams in Node.js:_**

1. Readable Streams: Used for reading data
2. Writable Streams: Used for writing data
3. Duplex Streams: Use for both reading and writing data
4. Transform Streams: A type of duplex stream that transforms the data input, and then outputs the transformed data.  

We will create various types of streams, and also how we can chain these types of streams together to form stream pipelines. 

## #️⃣ Creating streams in Node.js

The Node.js `stream` API is provided by the Node.js `stream` core module.

