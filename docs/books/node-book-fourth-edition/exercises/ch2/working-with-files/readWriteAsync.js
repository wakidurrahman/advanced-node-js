const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "text.txt");

/**
 * Step 1: readFile and writeFile asynchronous with callback
 *
 * The asynchronous function requires a callback function to be passed to it.
 * The callback function contains the code that we want to be executed when the asynchronous function completes.
 */

/** 
fs.readFile(filepath, "utf8", (err, contents) => {
  if (err) return console.error(err);

  console.log("File Contents: ", contents);
  const upperContents = contents.toLowerCase();

  fs.writeFile(filepath, upperContents, (err) => {
    if (err) throw err;

    console.log("File updated.");
  });
});
*/

/**
 * Step 2: To split the callbacks into named functions.
 * It's not recommended to have too many nested callbacks as it can negatively impact the readability of the code
 *
 * There are approaches that can be taken to avoid callback hell.
 * One approach would be to split the callbacks into named functions.
 *
 */

setInterval(() => process.stdout.write("******* \n"), 1).unref();

fs.readFile(filepath, "utf8", (err, contents) => {
  if (err) return console.error(err);

  console.log("File Contents: ", contents);
  const upperContents = contents.toUpperCase();

  // Split the callbacks into named functions.
  //   updateFile(filepath, upperContents);
  setTimeout(() => updateFile(filepath, upperContents), 10);
});

function updateFile(filepath, contents) {
  fs.writeFile(filepath, contents, (err) => {
    if (err) throw err;
    console.log("File updated.");
  });
}
