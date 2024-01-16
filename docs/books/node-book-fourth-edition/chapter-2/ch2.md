# Handling Input/Output

Node.js brought JavaScript to the server and has enabled us to interact with the operating system with JavaScript.

Node.js interacts with the operating system at a fundamental level: input and output.

## Handling standard I/O

- `STDIN (standard in)`: refers to an input stream that a program can use to read input from a command shell or Terminal. Similarly,
- `STDOUT (standard out)`: refers to the stream that is used to write the output.
- `STDERR (standard error)`: is a separate stream to STDOUT that is typically reserved for outputting errors and diagnostic data.

`process.stdin`, `process.stdout`, and `process.stderr` are all properties on the process object.

```js
process.stdin.on("data", (userInput) => {
  const name = userInput.toString().trim().toUpperCase();
  if (name !== "") {
    process.stdout.write(`Hello ${name}!`);
  } else {
    process.stderr.write("Input was empty.");
  }
});
```

A global `process` object provides the information and control of the Node.js `process`.
For each of the `I/O` channels, they emit data events for every chunk of data received. we were running the program in interactive mode where each data chunk was determined by the newline character when you hit Enter in your shell.

`process.stdin.on("data", (data) => {...});` is what listens for these data events.

Each data event returns a `Buffer` object. The `Buffer` object (typically named `data`) returns a binary representation of the input.

`const name = data.toString()` is what turns the `Buffer` object into a string. The `trim()` function removes the `newline` character that denoted the end of each input.

We write to `STDOUT` and `STDERR` using the respective properties on the process object (`process.stdout.write`, `process.stderr.write`). During the recipe, we also used `CTRL + C` to exit the program in the shell. CTRL + C sends `SIGINT`, or `signal interrupt`, to the Node.js process.

## Working with `fs` module managing files.

`fs` stands for File System, and this module provides the APIs to interact with the file system.

Today, there are three notable ways to handle asynchronous code in Node.js

1. callbacks,
2. Promises,
3. async/await syntax.

It's not recommended to have too many nested callbacks as it can negatively impact the readability of the code.

## Using the fs Promises API

A Promise is an object that is used to represent the completion of an asynchronous
function.

## Inspecting file metadata

The fs module generally provides APIs that are modeled around Portable Operating System Interface (POSIX) functions.

## Checking file access.

It is recommended that if you're attempting to read, write, or edit a file, you follow the approach of handling the error if the file is not found,

if you simply wanted to check the existence of a file, you could use the fs.access() or fs.accessSync() APIs.

## Modifying file permissions

The Node.js `fs` module provides APIs that can be used to alter the permissions on a given file. As with many of the other `fs` functions, there is both

- an asynchronous API, `chmod()`, and
- an equivalent synchronous API, `chmodSync()`.

**_`fs.chmod(path, mode, callback)`_**

the `chmod` functions take a file `path` and `mode` as the first and second arguments, respectively. The asynchronous function accepts a third parameter, which is the callback function to be executed upon completion.

Asynchronously changes the permissions of a file. No arguments other than a possible exception are given to the completion callback.

The `mode` argument used in both the `fs.chmod()` and `fs.chmodSync()` methods is a numeric `bitmask` created using a logical `OR` of the following constants:

The `mode` argument can be either in the form of a numeric `bitmask` using a series of constants provided by the `fs` module or a sequence of three `octal` digits.

Imagine that you have a file that currently has the following permissions: 

- Owner readable and writeable
- Group readable
- Readable only by all other users (sometimes referred to as world readable).



```js
/*
 * path <string> | <Buffer> | <URL>
 * mode <string> | <integer>
 * callback <Function>
 *   ↪️ err <Error>
 */

import { chmod } from "node:fs";

chmod("my_file.txt", 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "my_file.txt" have been changed!');
});


// 


```
