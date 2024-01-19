const fs = require("fs");

// use the `/dev/urandom` file, which is available on Unix-like operating systems.
// This file is a pseudo-random number generator. 
const readStream = fs.createReadStream("/dev/urandom");

let size = 0;

readStream.on("data", (data) => {
  size += data.length;
  console.log("File size: ", size);
});
