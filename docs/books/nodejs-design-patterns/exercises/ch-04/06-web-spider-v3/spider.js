import { access, writeFile, readFile } from 'node:fs';
import path from 'path';
import superagent from 'superagent';
import { mkdirp } from 'mkdirp';

import { getPageLinks, urlToFilename } from './utils.js';

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

/**
 * Downloading all the linked pages in parallel
 * we bring forth all the spider() tasks at once and then
 * invoke the final `callback` only when all of them have completed their execution.
 *
 * @param {*} currentUrl
 * @param {*} body
 * @param {*} nesting
 * @param {*} callback
 * @returns
 */
function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    // Remember Zalgo?
    return process.nextTick(callback);
  }

  /**
   * [1]:
   * We obtain the list of all the links contained in the page using the getPageLinks() function.
   * This function returns only the links pointing to an internal destination (the same hostname).
   */
  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(callback);
  }

  let completed = 0;
  let hasErrors = false;
  function done(err) {
    if (err) {
      hasErrors = true;
      return callback(err);
    }

    console.log('SpiderLink Done function calling', completed);

    if (++completed === links.length && !hasErrors) {
      return callback();
    }
  }
  console.log("Links List", links);

  links.forEach((link) => spider(link, nesting - 1, done));
}

/**
 * We now want to download all the links contained in a web page recursively.
 * To do that, we are going to extract all the links from the page and
 * then trigger our web spider on each recursively and in sequence.
 *
 * @url {*} url
 * @callback {*} callback
 *
 */
export const spider = (url, nesting, callback) => {
  const filename = urlToFilename(url);

  // [1]: read it and start spidering its links.
  readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      // The file doesn't exist, so let’s download it
      return download(url, filename, (err, requestContent) => {
        if (err) return callback(err);

        // code to execute when there are no errors
        spiderLinks(url, requestContent, nesting, callback);
      });
    }
    // The file already exists, let’s process the links
    spiderLinks(url, fileContent, nesting, callback);
  });
};
