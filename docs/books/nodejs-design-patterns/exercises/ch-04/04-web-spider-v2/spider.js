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
 * Downloads all the links of an HTML page using a sequential asynchronous iteration algorithm.
 * The algorithm allows us to iterate over an array by executing an asynchronous operation in sequence,
 * which in our case is the spider() function.
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
    return callback();
  }

  /**
   * [2]:
   * We iterate over the links using a local function called iterate(),
   * which takes the index of the next link to analyze.
   * @param {*} index
   * @returns
   */
  function iterate(index) {
    /**
     * Check whether the index is equal to the length of the links array,
     * in which case we immediately invoke the callback() function,
     * as it means we have processed all the items.
     */
    if (index === links.length) {
      return callback();
    }

    //
    /**
     * [3]:
     * At this point, everything should be ready for processing the link.
     * We invoke the spider() function by decreasing the nesting level and
     * invoking the next step of the iteration when the operation completes.
     */
    spider(links[index], nesting - 1, (err) => {
      if (err) return callback(err);

      // code to execute when there are no errors
      iterate(index + 1);
    });
  }

  // [4]: we bootstrap the iteration by invoking by passing argument 0.
  iterate(0);
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

  console.log('File name From Spider: ', filename);

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
