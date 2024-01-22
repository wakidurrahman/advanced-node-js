const fs = require("fs");

// First created a `readable stream` to read our `file.txt` file using the createReadStream() method.
const readStream = fs.createReadStream("./file.txt");

/**
 * Then piped the output of this `readable stream` to process.stdout (a `writable stream`) using the pipe() method.
 */
// We need to pipe our readable stream to `process.stdout`, which returns a writable stream connected to "STDOUT"

readStream.pipe(process.stdout); // We've piped a readable stream to a writeable stream using the pipe() method.
