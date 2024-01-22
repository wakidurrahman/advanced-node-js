const fs = require("fs");

// Create a `readable` stream to read the file.txt file using the "createReadStream" method.

const readStream = fs.createReadStream("./file-one.txt");

/**
 * To interact with a `readable` stream in `paused mode` by 
 * listening for the `readable` event and manually calling the read() method.
 * By default, a readable stream is in paused mode.
 */

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

// Register an end event handler to our readable stream that will print the "No more data"

readStream.on("end", () => {
  console.log("No more data. ");
});
