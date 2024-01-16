const fs = require("fs");
const moment = require("moment");

/**
 * To create a program that watches for changes in a file.
 */

// Input file to access this file.
const inputFile = "file.txt";

async function getFileMetaData(file) {
  fs.stat(file, (err, stats) => {
    if (err) console.error("Error ", err);
    console.log(stats);
  });
}

getFileMetaData(inputFile);

console.log("------ The options argument may be omitted ---------");

fs.watchFile(inputFile, (curr, prev) => {
  const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  console.log(`the current mtime now: ${time}`);
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});

fs.watch(inputFile, (eventType, filename) => {
  const time = moment().format("MMMM Do YYYY, h:mm:ss a");
  return console.log(`${filename} updated ${time}`);
});
