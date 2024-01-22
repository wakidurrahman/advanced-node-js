const fs = require("fs");

const { Transform } = require("stream");
const { stringify } = require("ndjson");

const NameTransform = new Transform({
  objectMode: true,
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
 */

NameTransform.pipe(stringify()).pipe(process.stdout);

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
