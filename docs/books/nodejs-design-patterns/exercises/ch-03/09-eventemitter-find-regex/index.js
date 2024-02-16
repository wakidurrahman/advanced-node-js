import { EventEmitter, on } from 'events';
import { readFile } from 'fs';

const regExp = /hello \w+/g;

function findRegex(files, regex) {
  const emitter = new EventEmitter();

  for (const file of files) {
    console.log('--- Particular -----');

    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err);
      }

      emitter.emit('fileread', file);
      const match = content.match(regex);
      if (match) {
        match.forEach((elem) => emitter.emit('found', file, elem));
      }
    });
  }
  return emitter;
}

findRegex(['fileA.txt', 'fileB.json'], regExp)
  .on('fileread', (file) => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', (err) => console.log(`Error emitter ${err.match}`));
