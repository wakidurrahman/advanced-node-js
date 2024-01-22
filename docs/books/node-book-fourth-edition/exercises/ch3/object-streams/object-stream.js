const fs = require("fs");

const { Transform } = require("stream");
const { stringify } = require("ndjson");

const newFile = fs.createWriteStream('newFile.txt');

const NameTransform = new Transform({
  objectMode: true, // writable side is in object mode,
  transform: ({ forename, surname, occupation }, encoding, callback) => {
    callback(null, {
      name: `${forename} ${surname}`,
      occupation: `${occupation}`,
    });
  },
});

/**
 * we can create our chain of streams
 * we will `pipe` the `NameTransform` transform stream to the stringify() method (from `ndjson`),
 * and then `pipe` result to process.stdout:
 * 
 * The `stringify()` function converts the streamed JSON objects into `newline-delimited` JSON
 * The stringify() stream is a transform stream where the `writable` side is in object mode, but the `readable` side is not.
 */

NameTransform.pipe(stringify()).pipe(process.stdout);
NameTransform.pipe(stringify()).pipe(newFile);

// Write some data to NameTransform transform stream using the write() method:

NameTransform.write({
  forename: "Jonathon",
  surname: "Doe",
  occupation: "Doctor",
});
NameTransform.write({
  forename: "Json",
  surname: "Roy",
  occupation: "Engineer",
});
