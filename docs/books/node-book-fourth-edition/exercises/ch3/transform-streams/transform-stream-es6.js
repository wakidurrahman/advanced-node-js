const fs = require("fs");
const { Transform } = require("node:stream");

const readStream = fs.createReadStream("./file.txt");
const processedFile = fs.createWriteStream("./processed-form-es6.txt");

class UppercaseTransform extends Transform {
  constructor() {
    super();
    // ...
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

readStream.pipe(new UppercaseTransform()).pipe(processedFile);
