const fs = require("fs");

const readStream = fs.createReadStream("./file-one.txt");

// Readable streams are asynchronous iterables. 
async function run() {
  for await (const chunk of readStream) {
    console.log("Read Chunk: ", chunk.toString());
  }
  console.log("No more data.");
}

run();
