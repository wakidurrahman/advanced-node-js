// import the Node.js core `fs`, `stream`, and `util` modules
const fs = require("fs");
const stream = require("stream");
const util = require("util");

// Need to call `util.promisify()` on the `stream.pipeline()` method
// The util.promisify() method is used to convert a callback-style method into Promise form.
const pipeline = util.promisify(stream.pipeline);

// Add the transform stream
const uppercase = new stream.Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

// As we'll be awaiting pipeline(), we will need to wrap the pipeline() logic in an asynchronous function:
async function pipelinePromise() {
  await pipeline(
    fs.createReadStream("./file.txt"),
    uppercase,
    fs.createWriteStream("pipelinePromiseText.txt")
  );
  console.log("Pipeline succeeded.");
}

// we can call our pipelinePromise() function, catching any errors
pipelinePromise().catch((err) => {
  console.error("Pipeline failed. ", err.message);
});
