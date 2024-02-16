import { readFile } from 'fs';

function readJSON(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      // propagate the error and exit the current function
      return callback(err);
    }

    // the try...catch statement to catch any error thrown by `JSON.parse()`
    try {
      // parse the file contents
      parsed = JSON.parse(data);
    } catch (err) {
      // catch parsing errors
      return callback(err);
    }

    // no errors, propagate just the data
    callback(null, parsed);
  });
}

const cb = (error, data) => {
  // if there is an error;
  if (error) {
    return console.error(error.message);
  }
  // print data
  console.log(data);
};

readJSON('valid_json.json', cb);
readJSON('invalid_json.json', cb);

