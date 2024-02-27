import { access, writeFile } from 'node:fs';
import path from 'path';
import superagent from 'superagent';
import { mkdirp } from 'mkdirp';

import { urlToFileName } from './utils.js';

/**
 * we will create a little web spider,
 * a command-line application that takes in a web URL as input and downloads its contents locally into a file.
 *
 * @url {*} url
 * @callback {*} callback
 *
 */
export const spider = (url, callback) => {
  const filename = urlToFileName(url);

  // Check if the file exists in the current directory.
  access(filename, (err) => {
    // [1]: checks whether the URL was already downloaded by verifying that the corresponding file was not already created.
    console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);

    // If err is defined and has type ENOENT, then the file does not exist and it's safe to create it:
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`);

      // [2]: If the file is not found, the URL is downloaded
      superagent.get(url).end((err, res) => {
        if (err) {
          callback(err);
        } else {
          // [3]: we make sure that the directory that will contain the file exists
          mkdirp(path.dirname(filename))
            .then((result) => {
              // [4] we write the body of the HTTP response to the filesystem
              writeFile(filename, res.text, (err) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, filename, true);
                }
              });
            })
            .catch((err) => {
              callback(err);
            });
        }
      });
    } else {
      callback(null, filename, false);
    }
  });
};
