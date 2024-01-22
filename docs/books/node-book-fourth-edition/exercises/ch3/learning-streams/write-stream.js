const fs = require("fs");
// To create the `writable stream` using the `createWriteStream()` method that is available on `fs` module
const file = fs.createWriteStream("./file-one.txt");

// Start writing content to our file. Let's write a random string to the file multiple times

for (let i = 0; i < 1000000; i++) {
  file.write(
    `${i} NodeJS is a JavaScript runtime build on Google Chrome's V8 JavaScript engine. \n`
  );
}

file.on("finish", () => {
  console.log("Finish writing");
});
