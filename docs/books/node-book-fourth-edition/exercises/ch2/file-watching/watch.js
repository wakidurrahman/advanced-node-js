const fs = require("fs");

/**
 * To create a program that watches for changes in a file.
 */

// Input file to access this file.
const inputFile = "./file.txt";

async function getFileMetaData(file) {
  fs.stat(file, (err, stats) => {
    if (err) console.error("Error ", err);
    console.log(stats);
  });
}

getFileMetaData(inputFile);

console.log("------ The options argument may be omitted ---------")

fs.watchFile("file.txt", (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});
