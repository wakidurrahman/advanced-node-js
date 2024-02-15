/**
 * let's write a module that can alter the behavior of the core `fs module`
 * so that it prevents the module from accessing the filesystem and returns mocked data instead.
 * This kind of module is something that could be useful while "writing tests" for a component that relies on the filesystem
 *
 */

import fs from 'fs'; // (1) import the default export of the fs module.

import { mockEnable, mockDisable } from './mock-read-file.js';

// (2) We want, for every file read, to simulate that the file contains the string "Hello World."
mockEnable(Buffer.from('Hello World!')); 


// (3) we read a file using a fake path. This code will print "Hello World" as it will be using the mocked version of the readFile() function.
fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString()); // 'Hello World!';
});

mockDisable();
