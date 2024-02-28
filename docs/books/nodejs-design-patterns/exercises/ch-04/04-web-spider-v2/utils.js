import path from 'path';
import { URL } from 'url';
import slug from 'slug';
import * as cheerio from 'cheerio';

/**
 *
 * @param {*} currentUrl
 * @param {*} element
 * @returns : string | null
 */

function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl);
  const currentParsedUrl = new URL(currentUrl);

  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }

  return parsedLink.toString();
}

/**
 *
 * @param {*} url
 * @returns
 */
export const urlToFilename = (url) => {
  const parsedUrl = new URL(url);
  console.log('parsedUrl ', parsedUrl);

  const urlPath = parsedUrl.pathname
    .split('/')
    .filter((component) => component !== '')
    .map((component) => slug(component, { remove: null }))
    .join('/');

  // Create file name with `.html` extension.
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }
  return filename;
};

/**
 * getPageLinks() function
 * We obtain the list of all the links contained in the page.
 * @param {*} currentUrl
 * @param {*} body
 * @returns: This function returns only the links pointing to an internal destination (the same hostname).
 */
export const getPageLinks = (currentUrl, body) =>
  Array.from(cheerio.load(body)('a'))
    .map((element) => getLinkUrl(currentUrl, element))
    .filter(Boolean);
