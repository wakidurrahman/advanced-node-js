const fs = require("fs");

// import the Transform class from the Node.js core `stream` module:
const { Transform } = require("stream");

// Create a `readable stream` to read `file.txt` file:
const readStream = fs.createReadStream("./file.txt");

/**
 * Once our file content has been processed by our transform stream, we will write it to a new file named `processed-form.txt`.
 * Create a `writable stream` to write this file using the `createWriteStream()` method:
 */

const processedFile = fs.createWriteStream("processed-form.txt");

// Define transform stream

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

// piped our `readable stream` to the `transform stream` and piped the `transform stream` to our `writable stream`
readStream.pipe(uppercase).pipe(processedFile);
