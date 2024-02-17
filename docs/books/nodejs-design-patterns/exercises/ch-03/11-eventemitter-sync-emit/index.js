import { EventEmitter } from 'events';
import { readFileSync } from 'fs';

const regExp = /hello \w+/g;
const fileList = ['fileA.txt', 'fileB.json', 'fileC.json'];

class FindRegexSync extends EventEmitter {
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
      let content;
      try {
        content = readFileSync(file, 'utf8');
      } catch (err) {
        this.emit('error', err); // ① error, when an error occurs during reading the file
      }

      this.emit('fileread', file); // ② 'fileread', when a file is being read

      const match = content.match(this.regex);
      if (match) {
        match.forEach((elem) => this.emit('found', file, elem)); // ③ 'found', when a match has been found
      }
    }
    return this;
  }
}

const findRegexInstance = new FindRegexSync(regExp);

findRegexInstance
  .addFile(fileList[0])
  .addFile(fileList[1])
  // this listener is invoked
  .on('found', (file, match) => console.log(`[Before] Matched "${match}"`))
  .findFiles()
  // this listener is never invoked
  .on('found', (file, match) => console.log(`[After] Matched "${match}"`));
