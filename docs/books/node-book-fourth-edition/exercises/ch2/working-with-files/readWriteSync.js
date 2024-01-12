// Requiring the built-in modules fs and path
const fs = require("fs"); // import the core Node.js File System module
const path = require("path");

// Create a variable to store the file path
// The process.cwd() method returns the current working directory of the Node.js process.
// process.cwd() is a function on the global `process` object that returns the current directory of the Node.js process.
const filepath = path.join(process.cwd(), "hello.txt");

// Read the file contents using the readFileSync function provided by the fs module.
const contents = fs.readFileSync(filepath, "utf8");
console.log("File Contents: ", contents);

// Convert the lowercase text into uppercase
const upperContents = contents.toUpperCase();

// to update the file, we can use writeFileSync()
fs.writeFileSync(filepath, upperContents);
console.log("File updated");
