const { Readable } = require("stream");

// Define the asynchronous generator function.

async function* generate() {
  yield "Node.js";
  yield "is";
  yield "a";
  yield "JavaScript";
  yield "Runtime";
}

// Create the readable stream using the Readable.from() method, passing `generate` function as the argument

const readable = Readable.from(generate());

readable.on("data", (chunk) => {
  console.log(chunk);
});
