/**
 * we'll create a stream pipeline using the pipeline() method.
 * Our pipeline will read the file.txt file,
 * convert the file contents to uppercase using a transform stream,
 * and then write the new file contents to a new file:
 *
 */

const fs = require("fs");
const { pipeline, Transform } = require("stream");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

/**
 * pipeline(); The pipeline method expects:
 *
 * The first: argument to be a readable stream
 * Our first argument will be a readable stream that will read the file.txt file,
 * using the createReadStream() method
 *
 * Second argument: we need to add our transform stream as the second argument to the pipeline() method.
 *
 * Third argument: Then, we can add our `writable stream` to write the `newFile.txt` file to the pipeline
 *
 * Forth argument: Finally, the last argument to our pipeline is a callback function
 * that will execute once the pipeline has completed.
 * This callback function will handle any errors in pipeline
 */
pipeline(
  fs.createReadStream("./file.txt"),
  uppercase,
  fs.createWriteStream("newFile.txt"),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err.message);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
);
