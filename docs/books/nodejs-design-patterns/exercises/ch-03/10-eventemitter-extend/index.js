import { EventEmitter } from 'events';
import { readFile } from 'fs';

const regExp = /hello \w+/g;
const fileList = ['fileA.txt', 'fileB.json', 'fileC.json'];

class FindRegex extends EventEmitter {
  constructor(regex) {
    // Always remember to use super() in the constructor to initialize the EventEmitter internals.
    super();

    this.regex = regex;
    this.files = [];
  }

  // addFile method
  addFile(file) {
    this.files.push(file);
    return this;
  }

  findFiles() {
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err); // ① error, when an error occurs during reading the file
        }

        this.emit('fileread', file); // ② 'fileread', when a file is being read

        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit('found', file, elem)); // ③ 'found', when a match has been found
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new FindRegex(regExp);

findRegexInstance
  .addFile(fileList[0])
  .addFile(fileList[1])
  .addFile(fileList[2])
  .findFiles()
  .on('fileread', (file) => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
  .on('error', (err) => console.error(`Error emitted ${err.match}`));
