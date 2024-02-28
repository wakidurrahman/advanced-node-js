import { access, writeFile } from 'node:fs';
import path from 'path';
import superagent from 'superagent';
import { mkdirp } from 'mkdirp';

import { urlToFilename } from './utils.js';

/**
 * we will create a little web spider,
 * a command-line application that takes in a web URL as input and downloads its contents locally into a file.
 *
 * @url {*} url
 * @callback {*} callback
 *
 */
export const spider = (url, callback) => {
  const filename = urlToFilename(url);

  console.log("File name From Spider: ", filename)

  // Check if the file exists in the current directory.
  access(filename, (err) => {
    // [1]: checks whether the URL was already downloaded by verifying that the corresponding file was not already created.
    if (!err || err.code !== 'ENOENT') {
      // [1]: we inverted the check for the file's existence so that we could apply the `early return principle`
      return callback(null, filename, false);
    }

    // If err is defined and has type ENOENT, 
    // then the file does not exist and it's safe to create it:
    download(url, filename, (err) => {
      if (err) return callback(err);

      // code to execute when there are no errors
      callback(null, filename, true);
    });
  });
};

function download(url, filename, callback) {
  // [2]: If the file is not found, the URL is downloaded
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
    if (err) return callback(err);

    // code to execute when there are no errors
    saveFile(filename, res.text, (err) => {
      if (err) return callback(err);

      // code to execute when there are no errors
      console.log(`Downloading and saved: ${url}`);
      callback(null, res.text);
    });
  });
}

function saveFile(filename, contents, callback) {
  // [3]: we make sure that the directory that will contain the file exists
  mkdirp(path.dirname(filename))
    .then(() => {
      // [4] we write the body of the HTTP response to the filesystem
      writeFile(filename, contents, callback);
    })
    .catch((err) => callback(err));
}
