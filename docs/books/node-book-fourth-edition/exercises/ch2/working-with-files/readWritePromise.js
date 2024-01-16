const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(process.cwd(), "promise.txt");

fs.readFile(filepath, "utf8")
  .then((contents) => {
    console.log("File Contents: ", contents);
    const upperContents = contents.toUpperCase();

    // Split the callbacks into named functions.
    // updateFile(filepath, upperContents);
    updateFile(filepath, upperContents);
  })
  .catch((err) => {
    if (err) return console.error("Error message ", err.message);
  });

function updateFile(filepath, contents) {
  fs.writeFile(filepath, contents)
    .then(() => {
      console.log("File updated.");
    })
    .catch((err) => {
      if (err) throw err;
    });
}
