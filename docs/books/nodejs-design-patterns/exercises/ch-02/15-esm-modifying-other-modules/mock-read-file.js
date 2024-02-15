/**
 * let's write a module that can alter the behavior of the core `fs module`
 * so that it prevents the module from accessing the filesystem and returns mocked data instead.
 * This kind of module is something that could be useful while "writing tests" for a component that relies on the filesystem
 *
 */

import fs from 'fs'; // (1): import the default export of the fs module.

const originalReadFile = fs.readFile; // (2): save a reference to the original implementation
let mockedResponse = null; // declare a mockedResponse value

// (3): the actual mocked implementation that we want to use to replace the original implementation.
function mockedReadFile(path, callback) {
  // This function invokes the callback with the current value of mockedResponse.
  setImmediate(() => {
    callback(null, mockedResponse);
  });
}

// (4): This function can be used to activate the mocked functionality. The original implementation will be swapped with the mocked one.
export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  fs.readFile = mockedReadFile;
}

// (5): function can be used to restore the original implementation of the fs.readFile() function.
export function mockDisable() {
  fs.readFile = originalReadFile;
}
