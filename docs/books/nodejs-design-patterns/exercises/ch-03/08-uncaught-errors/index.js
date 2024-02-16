import { readFile } from 'fs';

function readJSONThrows(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      // propagate the error and exit the current function
      return callback(err);
    }

    // no errors, propagate just the data
    callback(null, JSON.parse(data));
  });
}

// The error is not propagated to the final callback nor is caught
// by try/catch state

try {
  readJSONThrows('invalid_json.json', (err) => console.error(err));
} catch (error) {
  console.log('This will NOT catch the JSON parsing exception');
}

// Our last chance to intercept any uncaught error
process.on('uncaughtException', (err) => {
  console.error(
    `This will catch at last the JSON parsing exception: ${err.message}`
  );
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1);
});

