const fs = require("fs");

// To create a readable stream to read the contents of the file.

// Create readable stream with 'createReadStream' method.
// const readStream = fs.createReadStream("./file.txt");
const readStream = fs.createReadStream("./file-one.txt");

// Register a data event handler, which will execute each time a chunk of data has been read.
readStream.on("data", (data) => {
//   console.log("Read chunk: ", data);
/**
 * If we call `toString()` on the individual chunks of data within the data event handler function, 
 * we will see the String content output as it is processed.
 */
  console.log("Read chunk: ", data.toString());
});

// Add an "end" event handler, which will be fired when there is not more data left to be consumed from the stream:
readStream.on("end", () => {
  console.log("No more data.");
});
