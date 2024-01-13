const fs = require("fs");

// 
/**
 * process.argv: is a property on the global process object that returns an array containing the arguments that were passed to the Node.js process.
 * 
 * The first element of the `process.argv` array, process.argv[0] is the path of the `node` binary that is running.
 * The second element of the `process.argv` array, process.argv[1]  is the path of the file we're executing, in this case,` metadata.js`.
 * The third element of the `process.argv` array, process.argv[2] we passed the filename as the third command-line argument and therefore referenced it with process.argv[2].
 */
const file = process.argv[2];

// Print Metadata

function printMetadata(file) {
  const fileStats = fs.statSync(file);
  console.log(fileStats);
}

function printMetadataExceptionHandle(file) {
  try {
    const fileStats = fs.statSync(file);
    console.log(fileStats);
  } catch (error) {
    console.error("Error reading file path: ", file);
  }
}

printMetadataExceptionHandle(file);
