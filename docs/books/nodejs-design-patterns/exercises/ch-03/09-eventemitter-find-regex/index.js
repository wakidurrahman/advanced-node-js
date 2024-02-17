import { EventEmitter, on } from 'events';
import { readFile } from 'fs';

const regExp = /hello \w+/g;
const fileList = ['fileA.txt', 'fileB.json', 'fileC.json'];

function findRegex(files, regex) {
  const emitter = new EventEmitter();

  for (const file of files) {
    console.log('--- Particular -----');

    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err); // ① error, when an error occurs during reading the file
      }

      emitter.emit('fileread', file); // ② 'fileread', when a file is being read
      const match = content.match(regex);
      if (match) {
        match.forEach((elem) => emitter.emit('found', file, elem)); // ③ 'found', when a match has been found
      }
    });
  }
  return emitter;
}

findRegex(fileList, regExp)
  .on('fileread', (file) => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', (err) => console.error(`Error emitted ${err.match}`));
