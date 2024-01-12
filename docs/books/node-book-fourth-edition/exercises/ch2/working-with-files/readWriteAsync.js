const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "text.txt");

// readFile asynchronous with callback
fs.readFile(filepath, "utf8", (err, contents) => {
  if (err) return console.error(err);

  console.log("File Contents: ", contents);
  const upperContents = contents.toLowerCase();


  fs.writeFile(filepath, upperContents, (err) => {
    if (err) throw err;

    console.log("File updated.");
  });
});
