import path from 'path';
import { URL } from 'url';
import slug from 'slug';

export const urlToFilename = (url) => {
  const parsedUrl = new URL(url);
  console.log('parsedUrl ', parsedUrl);
  console.log('pathname ', parsedUrl.pathname);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter((component) => component !== '')
    .map((component) => slug(component, { remove: null }))
    .join('/');

  console.log('UrlPath: ', urlPath);

  // Create file name.
  let filename = path.join(parsedUrl.hostname, urlPath);
  console.log('FileName --- ', filename);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }
console.log("Final-file-Name ", filename)
  return filename;
};
