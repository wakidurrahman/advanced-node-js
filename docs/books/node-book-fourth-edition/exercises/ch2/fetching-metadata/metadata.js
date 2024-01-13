const fs = require("fs");

const file = process.argv[2];

// Print Metadata

function printMetadata(file) {
  const fileStats = fs.statSync(file);
  console.log(fileStats);
}

printMetadata(file);