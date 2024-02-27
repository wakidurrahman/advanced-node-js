import path from 'path';
import { URL } from 'url';
import slug from 'slug';

export const urlToFileName = (url) => {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter((component) => component !== '')
    .map((component) => slug(component, { remove: null }))
    .join('/');

  console.log('UrlPath', urlPath);

  let fileName = path.join(parsedUrl.hostname, urlPath);
  if (path.extname(fileName).match(/htm/)) {
    fileName += '.html';
  }

  return fileName;
};
